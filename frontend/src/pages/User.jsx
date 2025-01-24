// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import SingleCard from "../components/SingleCard";

const Admin = () => {
  // const [product, setProduct] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { id } = useParams();

  // useEffect(() => {
  //   setLoading(true);

  //   axios
  //     .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/video`)
  //     .then((response) => {
  //       setProduct(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // }, []);

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
        `${import.meta.env.VITE_BACKEND_PORT}/user/key/${streamId}`
      );
      console.log("Stream dimulai:", response.data);
      alert("Stream berhasil dimulai! dengan url: " + response.data);

      //dev only
      localStorage.setItem("streamKey", response.data);
    } catch (error) {
      console.error("Gagal memulai stream:", error);
      alert("Terjadi kesalahan saat memulai stream.");
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg font-medium">Loading...</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th> */}
      <button
        onClick={createStreamKey}
        className="bg-green-600 hover:bg-green-900 py-2 px-4 font-medium rounded-lg 
                    shadow-md text-base-100"
      >
        Start Stream
      </button>
      <SingleCard />
      {/* </th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr key={product._id} className="bg-base-100 hover:bg-base-300">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt={product.title} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5">{product.name}</td>
                  <td className="py-3 px-5">{product.price}</td>
                  <td className="py-3 px-5">{product.description}</td>
                  <td className="py-3 px-5">{product.category}</td>
                  <td className="py-3 px-5">
                    <div className="flex justify-center gap-x-1">
                      <Link
                        to={`/admin/product/edit/${product._id}`}
                        className="bg-orange-500 hover:bg-orange-900 text-white py-2 px-4 font-medium rounded-l-lg text-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/admin/product/delete/${product._id}`}
                        className="bg-red-500 hover:bg-red-900 text-white py-2 px-4 font-medium rounded-r-lg text-sm"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
};

export default Admin;
