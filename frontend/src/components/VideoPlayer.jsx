import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Loader from "./Loader";

const VideoPlayer = () => {
  const [urlLive, setUrlLive] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/strseam`)
      .then((response) => {
        
        if (response.data.streams && response.data.streams.length > 0) {
          setUrlLive(response.data.streams[0].streamUrl);
          console.log(response.data);
        } else {
          console.error("Tidak ada stream tersedia.");
        }
      })
      .catch((error) => {
        console.error("Gagal memuat URL video:", error);
      });
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    playerRef.current?.play();
  };

  const handleStop = () => {
    setIsPlaying(false);
    playerRef.current?.seekTo(0);
  };

  return (
    <div>
      {urlLive ? (
        <div>
          <ReactPlayer
            ref={playerRef}
            url={urlLive}
            controls={true}
            playing={isPlaying}
          />
          <div>
            <button onClick={handlePlay} disabled={isPlaying}>
              Play
            </button>
            <button onClick={handleStop} disabled={!isPlaying}>
              Stop
            </button>
          </div>
        </div>
      ) : (
        <Loader total={1} />
      )}
    </div>
  );
};

export default VideoPlayer;
