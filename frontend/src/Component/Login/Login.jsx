import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api_calls/api";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      const data = await loginUser(loginData);
      if (data) {
        navigate("/api/dashboard");
      }
      console.log("Login Successfull", data);
      alert("Successfully Login!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Login Failed:", error.message);
      alert("Login Failed:", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="btn-container">
          <button
            type="submit"
            className="btns"
            id="btn1"
            // onClick={handleReset}
          >
            SUBMIT
          </button>
          <Link to="/">
            <button type="button" className="btns">
              BACK
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
