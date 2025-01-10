// import React from "react";
import { useEffect, useState } from "react";
import "./Home.scss";
import Banner from "../../assets/Banner.png";
import { getCount, getUser } from "../../api_calls/api.js";
import projecticon from "../../assets/Project.png";
import taskicon from "../../assets/task.png";
import meeting from "../../assets/Meeting.png";
import Party from "../../assets/Party.png";

const Home = () => {
  const [user, setUser] = useState("");
  const [task, setTask] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await getUser();
        const name = await response?.data.userDetails.name;
        setUser(name);
        return name;
      } catch (error) {
        console.log(
          "Failed to get the user details:",
          error.response?.message || error.message
        );
        throw new Error();
      }
    };
    getuser();
  }, []);

  useEffect(() => {
    const getcount = async () => {
      // e.preventDefault();
      try {
        const response = await getCount(); // Assuming `getCount` is the API call function
        console.log("just checking", response);
        if (response?.count) {
          setTask(response.count?.Task || 0); // Safely accessing Task
          setProject(response.count?.Project || 0); // Safely accessing Project
        } else {
          console.log("No count data found in the response.");
        }
      } catch (error) {
        console.error(
          "Failed to fetch the counts:",
          error.response?.data?.message || error.message || "Unknown error"
        );
      }
    };

    getcount();
  }, []);
  useEffect(() => {
    console.log("useEffect executed");
  }, []);

  return (
    <div id="dashboard">
      <div id="banner">
        <div id="bnr-content">
          <div id="bnr-text">
            <h2>Hello, {user}</h2>
            {/* <h4>Welcome Again</h4> */}
            <h4>
              Welcome back! Lets turn plans into progress. Your tasks, your
              goals—lets achieve them together!
            </h4>
          </div>
          <img src={Banner} alt="Banner.png" />
        </div>
      </div>
      <div id="content">
        <h3>OVERVIEW</h3>
        <div id="overview">
          <div className="ov">
            <img src={projecticon} alt="project.png" />
            <div className="text">
              <p className="count">PROJECT - {project}</p>
              <p>
                Your projects are moving ahead! Stay focused and bring your
                ideas to life!.
              </p>
            </div>
          </div>

          <div className="ov">
            <img src={taskicon} alt="project.png" />
            <div className="text">
              <p className="count">TASK - {task}</p>
              <p>
                Great work so far! Keep pushing forward and achieve your goals,
                one task at a time.
              </p>
            </div>
          </div>
        </div>
        <h3>MILESTONES</h3>

        <div id="milestones">
          <div className="mile">
            <div className="img">
              <img src={meeting} alt="May20,2025" />
            </div>
            <div className="description">
              <h2>Project Kickoff Meeting </h2>
              <p> Team meeting to discuss deliverables for the new project.</p>
              <strong>May 20, 2025</strong>
            </div>
          </div>

          <div className="mile">
            <div className="img">
              <img src={Party} alt="Jun 17, 2025" />
            </div>
            <div className="description">
              <h2>Annual Party Organization</h2>
              <p>
                Organizing an annual function to celebrate and appreciate
                achievements.
              </p>
              <strong>July 17, 2025</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
