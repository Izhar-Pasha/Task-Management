import "./Registration.scss";
import { registerUser } from "../../api_calls/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        password,
      };
      const response = await registerUser(userData);
      console.log("Login SUccessfull", response);
      toast.success("Successfully Registered!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Failed to login:", error.response?.message || error.message);
      toast.error("Failed to register:", error);
    }
  };
  return (
    <div className="form-container">
      <h2>REGISTER</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          id="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          <button type="submit" className="btns">
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

export default Register;
