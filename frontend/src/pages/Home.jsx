import { Link } from "react-router-dom";
// import VideoPlayer from "../components/VideoPlayer";

const Home = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">.</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {/* <VideoPlayer/> */}
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
