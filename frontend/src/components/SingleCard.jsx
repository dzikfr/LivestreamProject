
const SingleCard = () => {

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">

      <figure>
        <img className="w-full h-[200px] object-cover object-top" />
      </figure>

      <div className="card-body bg-base-200">
        <h2 className="card-title">{}</h2>
        <p> No description available.</p>
        <div className="price"></div>


        <div className="card-actions justify-end">
          {}
        </div>

      </div>
    </div>
  );
};

export default SingleCard
