import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import SingleCard from "../components/SingleCard";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const Admin = () => {

  const { id } = useParams();
  const [streamKey, setStreamKey] = useState("");

  const createStreamKey = async () => {
    // Jika id tidak tersedia di URL, coba ambil dari localStorage
    const streamId = id || localStorage.getItem("streamId");

    if (!streamId) {
      alert("Stream ID tidak ditemukan!");
      return;
    }

    try {
      // Panggil API untuk memulai stream
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_PORT}/user/key/${streamId}`, config
      );
      console.log("Stream dimulai:", response.data);
      alert("Stream berhasil dimulai! dengan url: " + response.data);

      //dev only
      localStorage.setItem("streamKey", response.data);

      const data = response.data;

      setStreamKey(data);
    } catch (error) {
      console.error("Gagal memulai stream:", error);
      alert("Terjadi kesalahan saat memulai stream.");
    }
  };

  const endStreamKey = async () => {
    // Jika id tidak tersedia di URL, coba ambil dari localStorage
    const streamId = id || localStorage.getItem("streamId");

    if (!streamId) {
      alert("Stream ID tidak ditemukan!");
      return;
    }

    try {
      // Panggil API untuk memulai stream
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_PORT}/user/key/${streamId}`, config
      );
      console.log("Stream dimulai:", response.data);
      alert("Stream selesai: " + response.data.message);
      setStreamKey("");

      //clear stream key
      localStorage.removeItem("streamKey");
    } catch (error) {
      console.error("Gagal memulai stream:", error);
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
        className="bg-green-600 hover:bg-green-900 py-2 px-4 font-medium rounded-lg 
                    shadow-md text-base-100"
      >
        End Stream
      </button>
      <div>
        <p>Stream Key: {streamKey}</p>
      </div>
      <SingleCard />
    </div>
  );
};

export default Admin;
