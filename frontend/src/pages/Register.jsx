import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/user/register`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
          navigate("/dashboard"); 
          localStorage.setItem("validation", "true");
          localStorage.setItem("user_id", response.data.data.user_id);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Register gagal, coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Navbar/>
      <div className="card w-full max-w-md shadow-lg bg-base-200">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Register</h2>
          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <div><span>Already have account? <a href="/login">Login</a></span></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
