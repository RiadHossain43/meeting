import React from "react";
export default function Controls({ mediaState, videoClick, audioClick }) {
  return (
    <div className="controls_container">
      <nav>
        <ul>
          <li>
            <a onClick={videoClick} href="#empty">
              {mediaState.video ? <span>Video</span> : <del>Video</del>}
            </a>
          </li>
          <li>
            <a onClick={audioClick} href="#empty">
              {mediaState.audio ? <span>Audio</span> : <del>Audio</del>}
            </a>
          </li>
          <li>
            <a href="#empty">Share sceen</a>
          </li>
          <li>
            <a href="#empty">Leave</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
