import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import SingleCard from "../components/SingleCard";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Pastikan ini multipart/form-data
  },
};

const Admin = () => {
  const { id } = useParams();
  const [streamKey, setStreamKey] = useState("");
  const [file, setFile] = useState(null); // State untuk menyimpan file yang dipilih

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File selected:", selectedFile);
  };

  const uploadVideo = async () => {
    if (!file) {
      enqueueSnackbar("Please select a video file first", {
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("video", file); // Pastikan key sesuai dengan API: "video"

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/dvr/upload/${id}`,
        formData,
        config
      );
      console.log("Video uploaded:", response.data);
      enqueueSnackbar("Video uploaded successfully", { variant: "success" });
    } catch (error) {
      console.error("Error uploading video:", error);
      enqueueSnackbar("Failed to upload video", { variant: "error" });
    }
  };

  const createStreamKey = async () => {
    const streamId = id || localStorage.getItem("streamId");

    if (!streamId) {
      alert("Stream ID tidak ditemukan!");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_PORT}/user/key/${streamId}`,
        config
      );
      console.log("Stream dimulai:", response.data);
      alert("Stream berhasil dimulai! dengan key: " + response.data + "");

      localStorage.setItem("streamKey", response.data);
      setStreamKey(response.data);
    } catch (error) {
      console.error("Gagal memulai stream:", error);
      alert("Terjadi kesalahan saat memulai stream.");
    }
  };

  const endStreamKey = async () => {
    const streamId = id || localStorage.getItem("streamId");

    if (!streamId) {
      alert("Stream ID tidak ditemukan!");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_PORT}/user/key/${streamId}`,
        config
      );
      console.log("Stream selesai:", response.data);
      alert("Stream selesai: " + response.data.message);
      setStreamKey("");

      localStorage.removeItem("streamKey");
    } catch (error) {
      console.error("Gagal mengakhiri stream:", error);
      alert("Terjadi kesalahan saat selesai stream.");
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <button
        onClick={createStreamKey}
        className="bg-green-600 hover:bg-green-900 py-2 px-4 font-medium rounded-lg 
                    shadow-md text-base-100"
      >
        Start Stream
      </button>
      <button
        onClick={endStreamKey}
        className="bg-red-600 hover:bg-red-900 py-2 px-4 font-medium rounded-lg 
                    shadow-md text-base-100 ml-2"
      >
        End Stream
      </button>
      <div className="mt-4">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          accept="video/*" // Membatasi hanya file video
          onChange={handleFileChange}
        />
        <button
          onClick={uploadVideo}
          className="bg-blue-600 hover:bg-blue-900 py-2 px-4 font-medium rounded-lg 
                      shadow-md text-base-100 mt-2"
        >
          Upload Video
        </button>
      </div>
      <div className="mt-4">
        <p>Stream Key: {streamKey}</p>
      </div>
      <SingleCard />
    </div>
  );
};

export default Admin;
