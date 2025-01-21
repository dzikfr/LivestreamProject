import VideoPlayer from "../Components/VideoPlayer";

const Dashboard = () => {
  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
          <h2>Start Streaming</h2>
        </div>
        <div className="divider"></div>
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
          <h2>View other Streams</h2>
          <VideoPlayer/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
