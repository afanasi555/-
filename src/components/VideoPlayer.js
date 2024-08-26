import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function VideoPlayer({ videoUrl }) {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    // Extract video ID from YouTube URL
    const videoId = new URLSearchParams(new URL(videoUrl).search).get('v');
    setVideoId(videoId);
  }, [videoUrl]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h2>Video Player</h2>
      {videoId && <YouTube videoId={videoId} opts={opts} />}
    </div>
  );
}

export default VideoPlayer;
