import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const View = () => {
  const { id } = useParams();
  const [linkVideo, setLinkVideo] = useState("");

  useEffect(() => {
    console.log("ID dari URL:", id); // Debug ID
    if (id) {
      axios
        .get(`http://localhost:3000/stream/${id}`)
        .then((response) => {
          console.log("Respons dari API:", response.data);
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
          url={linkVideo}
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
