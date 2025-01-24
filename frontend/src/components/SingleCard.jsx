import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};


const SingleCard = () => {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PORT}/dvr`, config)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, [config]);

  const viewIncrement = async (videoId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/dvr/view/${videoId}`
      );
    } catch (error) {
      console.error("Error incrementing view:", error);
    }
  };

  const handleView = (e, videoId, playbacklink) => {
    e.preventDefault();
    viewIncrement(videoId).then(() => {
      window.open(playbacklink, "_blank");
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {videos.map((video) => (
        <div key={video.id} className="card card-compact bg-base-100 shadow-xl">
          <figure className="h-48 overflow-hidden">
            <ReactPlayer
              url={video.playbacklink}
              controls
              width="100%"
              height="100%"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{video.video_name}</h2>
            <h2 className="card-title">{video.username}</h2>
            <p>
              <b>Views:</b> {video.viewcount}
            </p>
            <p>
              <b>Date:</b> {video.created_date}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-secondary"
                onClick={(e) => handleView(e, video.id, video.playbacklink)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCard;
