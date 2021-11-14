import useVideo from "hooks/useVideo";
import React, { useState } from "react";
import Controls from "./Controls";

function MakeCall({ onCall }) {
  let [value, setValue] = useState("");
  return (
    <>
      <input type="text" onChange={(e) => setValue(e.currentTarget.value)} />
      <button onClick={(e) => onCall(value)}>Call</button>
    </>
  );
}
export default function VideoSection(props) {
  let {
    myStreamReference,
    userStreamReference,
    mediaState,
    toggleAudio,
    toggleVideo,
    makeCall,
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
      <MakeCall onCall={makeCall} />
    </>
  );
}
