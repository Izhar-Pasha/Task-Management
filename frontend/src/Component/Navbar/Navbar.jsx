import { Outlet } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const handleClick = () => {
    const addClass = document.querySelector(".nav");
    addClass.classList.add("navbar");
  };
  const HandleClick = () => {
    const addClass = document.querySelector(".nav");
    addClass.classList.remove("navbar");
  };
  return (
    <div id="nav-route">
      <div className="nav">
        <div id="logo">
          <img src={Logo} alt="TaskFlow Logo" />
          <p>TaskFLow</p>
        </div>
        <div id="content">
          <ul>
            <Link className="link" to={"/api/Dashboard"}>
              Dashboard
            </Link>
            <Link className="link" to={"/api/Projects"}>
              Projects
            </Link>
            <Link className="link" to={"/api/Task"}>
              Tasks
            </Link>
            <Link className="link" to={"/api/Setting"}>
              Settings
            </Link>
          </ul>
          <div id="toogle">
            <button className="btn" id="close-btn" onClick={handleClick}>
              <span>Close</span>
              <FcPrevious />
            </button>
            <button className="btn" id="open-btn" onClick={HandleClick}>
              <span>Open</span>
              <FcNext />
            </button>
          </div>
        </div>
      </div>
      <div id="routes">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
