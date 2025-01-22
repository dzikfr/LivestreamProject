const Loader = ({ total }) => {
  return (
    <div>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="loading loading-spinner loading-m"></span>
      ))}
    </div>
  );
};

export default Loader;
