import { useEffect, useState } from "react";
import { getAll, getAllTasks, newTask } from "../../api_calls/api";
import "./Task.scss";
import Edit from "../../assets/Edit.png";
import Delete from "../../assets/Delete.png";
import { Link } from "react-router-dom";

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        project: selectProject,
      };
      const response = await newTask(taskData);
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        closeModal();
        alert("Task added successfully!");
      }
    } catch (error) {
      console.log("Failed to create new task:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAll();
        if (response.status === 200) {
          setProject(response.data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.log("Error fetching project names:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        if (response.status === 200 && Array.isArray(response.data)) {
          setTasks(response.data);
          setError(null);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setError("Failed to fetch tasks: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filterTasks = Array.isArray(tasks)
    ? tasks.filter((task) =>
        task?.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="tasks">
      {/* Search Bar */}
      <div id="search">
        <input
          type="search"
          placeholder="Search Your Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Project Button */}
      <div id="add-projects">
        <button id="add" onClick={openModal}>
          Add Task
        </button>
      </div>

      <div id="content">
        <div id="cards">
          {filterTasks.length > 0 ? (
            filterTasks.map((task) => (
              <div className="card" key={task._id}>
                <div id="text-info">
                  <h1>{task.title}</h1>
                  <p>{task.description}</p>
                </div>
                <div id="manager">
                  {/* <p>
                    {task.project && project.length > 0
                      ? project.find((p) => {
                          p._id === task.project;
                        }) || "Project not found"
                      : "No Project"}
                  </p> */}
                  <p>
                    {task.project && project.length > 0
                      ? (() => {
                          const associatedProject = project.find(
                            (p) => p._id === task.project
                          );
                          return associatedProject
                            ? associatedProject.name
                            : "Project not found";
                        })()
                      : "No Project"}
                  </p>

                  <img
                    src={Edit}
                    alt="Edit"
                    title="Edit"
                    // Add edit functionality here
                  />
                  <Link to={"/Delete"}>
                    <img src={Delete} alt="Delete" title="Delete" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Task Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project:</label>
                <select
                  value={selectProject}
                  onChange={(e) => setSelectProject(e.target.value)}
                >
                  {project.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
