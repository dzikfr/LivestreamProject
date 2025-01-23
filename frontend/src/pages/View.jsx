import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [linkVideo, setLinkVideo] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:2022/user/key/${id}`)
      .then((response) => {
        setUrl(response.data);
        console.log(response);
        const linkVideo = url.split("?",[0]);
        setLinkVideo(linkVideo);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, url]);

  return (
    <div>
      <ReactPlayer
        url={`http://localhost:2022/live/${linkVideo}.m3u8`}
        controls
      />
    </div>
  );
};

export default View;
