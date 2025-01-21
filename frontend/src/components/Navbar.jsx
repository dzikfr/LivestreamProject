import ChangeTheme from "./ChangeTheme";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full shadow-md">
      <div className="navbar bg-base-100">
        <div className="flex-1 justify-between items-center">
          <a className="btn btn-ghost text-xl">Livestream Platform</a>
        </div>
        <div className="flex-none">
          <ChangeTheme />
          <Link className="btn btn-outline mr-3" to={"/"}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
