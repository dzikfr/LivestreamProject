const Loader = ({ total }) => {
  return (
    <div>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className="loading loading-ring loading-md"></span>
      ))}
    </div>
  );
};

export default Loader;
