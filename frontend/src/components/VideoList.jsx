import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/stream`)
      .then((response) => {
        setVideos(response.data.streams);
        console.log(response.data);
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Gagal memuat URL video:", error);
      });
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.streamId}>
          <h2>{video.streamName}</h2>
          <p>Clients: {video.clients}</p>
          <ReactPlayer
            ref={playerRef}
            url={video.streamUrl}
            controls={true}
            playing={isPlaying}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
