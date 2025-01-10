import "./Intro.scss";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div id="intro">
      <div className="container">
        <h2>Hello!</h2>
        <h2>Welcome To Task Manager</h2>
        <p>
          Effortlessly manage your schedules with a seamless and user-friendly
          experience.
        </p>
      </div>
      <div id="buttons">
        <Link to={"/register"}>
          <button className="btns">REGISTER</button>
        </Link>
        <Link to={"/login"}>
          <button className="btns">LOGIN</button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
