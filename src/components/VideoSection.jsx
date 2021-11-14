import useVideo from "hooks/useVideo";
import React from "react";
import Controls from "./Controls";
export default function VideoSection(props) {
  let {
    myStreamReference,
    userStreamReference,
    mediaState,
    toggleAudio,
    toggleVideo,
  } = useVideo();
  return (
    <>
      <Controls
        mediaState={mediaState}
        videoClick={toggleVideo}
        audioClick={toggleAudio}
        {...props}
      />
      <div className="video_container">
        <video ref={myStreamReference} autoPlay></video>
        <video ref={userStreamReference} autoPlay></video>
      </div>
    </>
  );
}
