import { useRef, useEffect, useState } from "react";
import peerConnection from "services/peerService";
import socketConnection from "services/socketService";

export default function useVideo(initialState) {
  let [mediaState, setMediaState] = useState(initialState && initialState.mediaState ? initialState.mediaState : {
    video: true,
    audio: false,
  });
  let myStreamReference = useRef()
  let userStreamReference = useRef()
  let [mediaStream, setMediaStream] = useState(null)
  useEffect(() => {
    initializeStream();
    joinMeeting();
  }, [mediaState]);
  function toggleVideo(e) {
    setMediaState((prevState) => ({ ...prevState, video: !prevState.video }));
  }
  function toggleAudio(e) {
    setMediaState((prevState) => ({ ...prevState, audio: !prevState.audio }));
  }
  async function initializeStream() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia(mediaState);
      myStreamReference.current.srcObject = stream;
      setMediaStream(stream)
    } catch (err) {
      console.log(err);
    }
  }
  function joinMeeting() {
    _initializeMeeting()
  }
  function _initializeMeeting() {
    socketConnection.init()
    peerConnection.init()
    socketConnection.getSocket().on('disconnect', (reason) => {
      console.log("Socket Disconnected", reason)
    })
    socketConnection.getSocket().on('connect', () => {
      peerConnection.getPeer().on('open', id => {
        socketConnection.getSocket().emit('join-meeting', { meetingId: 'riads-meeting', userId: id })
        socketConnection.getSocket().on('join-success', (data) => {
          _call(data)
          _answer()
        })
      })
    })
  }
  async function _call(data) {
    let call = peerConnection.getPeer().call(data.userId, mediaStream)
    console.log('New Call initiate...', call, data.userId)
    call && call.on('stream', userStream => {
      userStreamReference.current.srcObject = userStream
      console.log('Connected...')
    })
  }
  function _answer() {
    peerConnection.getPeer().on('call', call => {
      console.log('A new call is comming...')
      call.answer(mediaStream)
      call.on('stream', userStream => {
        userStreamReference.current.srcObject = userStream
        console.log('Answer done...')
      })
    })
  }
  return {
    myStreamReference,
    userStreamReference,
    mediaState,
    toggleVideo,
    toggleAudio,
    joinMeeting
  }
}
