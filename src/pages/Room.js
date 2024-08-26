import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import VideoPlayer from '../components/VideoPlayer';

function Room() {
  const { id } = useParams();

  return (
    <div>
      <h1>Room {id}</h1>
      <VideoPlayer videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      <Chat roomId={id} />
    </div>
  );
}

export default Room;
