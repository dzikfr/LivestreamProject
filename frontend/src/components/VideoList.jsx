import { useState, useEffect } from "react"
import axios from "axios"

const VideoList = () => {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        // Get video URL from backend
        axios
          .get(`${import.meta.env.VITE_BACKEND_PORT}/video/stream`)
          .then((response) => {
            setVideos(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Gagal memuat URL video:", error);
          });
    })
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <video src={video.url} controls />
        </div>
      ))}
    </div>
  )
}

export default VideoList
