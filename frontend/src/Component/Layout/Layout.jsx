import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="content">
      <div className="overlay">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
