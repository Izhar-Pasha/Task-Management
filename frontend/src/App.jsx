import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Component/Intro/Intro.jsx";
import Login from "./Component/Login/Login.jsx";
import Registration from "./Component/Registration/Registration.jsx";
import Layout from "./Component/Layout/Layout.jsx";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Home from "./Component/Home/Home.jsx";
import Project from "./Component/Project/Project.jsx";
import Task from "./Component/Task/Task.jsx";
import Setting from "./Component/Setting/Setting.jsx";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Navbar />}>
          <Route path="/api/dashboard" element={<Home />} />
          <Route path="/api/Projects" element={<Project />} />
          <Route path="/api/Task" element={<Task />} />
          <Route path="/api/Setting" element={<Setting />} />
        </Route>
      </Routes>
      <Analytics />
      <Toaster />
    </Router>
  );
}

export default App;
