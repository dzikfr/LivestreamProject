import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoList";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <Navbar />
      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center">
          <div className="w-full max-w-4xl h-0 pb-[56.25%] relative">
            <VideoPlayer />
          </div>
        </div>
        <div className="divider"></div>
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            View other Streams
          </h2>
          <VideoList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
