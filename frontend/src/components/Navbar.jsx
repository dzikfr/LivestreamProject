import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <div className="navbar max-w-[1200px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/video">Video</Link>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          liveteria
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>

      <div className="navbar-end gap-12">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ThemeToggleButton />
          </li>
          <li>
            <Link to="/login" className="border-2">LOGIN</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
