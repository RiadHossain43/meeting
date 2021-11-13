import React, { useEffect, useState } from "react";
export default function VideoSection(props) {
  let [myStream, setMyStream] = useState(null);
  async function initializeStream() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    initializeStream();
  }, []);
  return (
    <div className="video_container">
      <video src={myStream} autoPlay></video>
    </div>
  );
}
