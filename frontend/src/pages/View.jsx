import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [linkVideo, setLinkVideo] = useState("");

  useEffect(() => {
    console.log("ID dari URL:", id); // Debug ID
    if (id) {
      axios
        .get(`http://localhost:3000/stream/${id}`) // Pastikan URL benar
        .then((response) => {
          console.log("Respons dari API:", response.data); // Debug respons API
          setLinkVideo(response.data.streamUrl);
        })
        .catch((error) => {
          console.error("Error fetching stream URL:", error);
        });
    }
  }, [id]);

  return (
    <div>
      {linkVideo ? (
        <ReactPlayer
          url={"http://localhost:2022/live/7e3f6e9ce16f.m3u8"}
          controls
          width="100%"
          height="100%"
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default View;
