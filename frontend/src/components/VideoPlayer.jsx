import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Loader from "./Loader";

const VideoPlayer = () => {
  const [urlLive, setUrlLive] = useState("");

  useEffect(() => {
    // Get video URL from backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/video`)
      .then((response) => {
        setUrlLive(response.data.url);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Gagal memuat URL video:", error);
      });
  }, []);

  return (
    <div>
      {urlLive ? (
        <ReactPlayer url={urlLive} controls={true} />
      ) : (
        <Loader total={3} />
      )}
    </div>
  );
};

export default VideoPlayer;
