import ReactPlayer from "react-player";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

const View = () => {
  // const { id } = useParams();
  // const [linkVideo, setLinkVideo] = useState("");

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/user/key/${id}`)
  //     .then((response) => {
  //       // Ambil URL dari response
  //       const url = response.data;
  //       console.log("URL:", url);
  //       console.log("ID:", id);

  //       // Split URL pada tanda "?" dan ambil bagian sebelum tanda tersebut
  //       const linkVideo = url.split("?")[0];
  //       console.log("Link Video:", linkVideo);

  //       // Set nilai ke state
  //       setLinkVideo(linkVideo);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     });
  // }, [id]);

  return (
    <div>
      <ReactPlayer
        url={`http://localhost:2022/live/7e3f6e9ce16f.m3u8`}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default View;
