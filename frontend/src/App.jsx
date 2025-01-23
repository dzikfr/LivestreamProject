import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminNavbar from "./components/AdminNavbar";
import User from "./pages/User";
import Stream from "./pages/Stream";
import Test from "./pages/Test";
import View from "./pages/View";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test/>} />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserRoutes/>
            </ProtectedRoute>
          }
        />
      </Routes>
      {isAdminRoute ? "" : <Footer />}
    </>
  );
}

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<User/>} />
      <Route path="/stream" element={<Stream/>} />
    </Routes>
  );
};

export default App;
