import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/Card";
// import VideoPlayer from '../Components/VideoPlayer';
// import VideoList from '../components/VideoList';
import SingleCard from "../components/SingleCard";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const latestProducts = product.slice(0, 9);

  return (
    <div className="p-4 max-w-[1300px] mx-auto my-16">
      <div className="hero-content text-center mb-24">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="text-teal-700">liveteria</span>
          </h1>
          <p className="py-6">Stream and Watch!</p>
        </div>
      </div>
      <SingleCard />

      <ProductCard product={latestProducts} />
    </div>
  );
};

export default Home;
