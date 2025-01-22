import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${id}`)
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false);
        console.log(userData.streamlink, userData.streamkey);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Tetap set loading ke false meski terjadi error
      });
  }, [id, userData.streamlink, userData.streamkey]);

  if (loading) {
    return (
      <p className="text-center text-lg font-medium">Loading user data...</p>
    );
  }

  if (!userData) {
    return (
      <p className="text-center text-lg font-medium text-red-500">
        User not found.
      </p>
    );
  }

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <p>
          <strong>ID:</strong> {userData.id}
        </p>
        <p>
          <strong>Username:</strong> {userData.username}
        </p>
        <p>
          <strong>Stream Link:</strong>{" "}
          {userData.streamlink || "No stream link provided"}
        </p>
        <p>
          <strong>Stream Key:</strong>{" "}
          {userData.streamkey || "No stream key provided"}
        </p>
        <p>
          <strong>Token:</strong> <code>{userData.token}</code>
        </p>
      </div>
    </div>
  );
};

export default User;
