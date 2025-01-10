import { useEffect, useState } from "react";
import "./Project.scss";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/Delete.png";
import { Link } from "react-router-dom";
import { getAll, newProject, updateProject } from "../../api_calls/api";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Open and close modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (project) => {
    setSelectedProjectId(project._id);
    setName(project.name);
    setDescription(project.description);
    setIsEditModal(true);
  };
  const closeEditModal = () => setIsEditModal(false);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getAll();
        if (response.status === 200) {
          setProjects(response.data);
          setError(null);
        } else {
          // throw new Error("Invalid response format");
          console.log("error izhar");
        }
      } catch (error) {
        setError("Failed to fetch projects: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }
    const projectData = { name, description, tasks: [] };
    try {
      const response = await newProject(projectData);
      if (response?.status === 200) {
        setProjects([...projects, response.data]);
        alert("Project Added Successfully!");
        closeModal();
      } else {
        alert("Failed to add project.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Something went wrong while adding the project.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }
    const projectData = { name, description };
    try {
      if (!selectedProjectId) {
        alert("Project ID is missing!");
        return;
      }
      const response = await updateProject(selectedProjectId, projectData);
      if (response?.status === 200) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === selectedProjectId ? response.data : project
          )
        );
        alert("Project Updated Successfully!");
        closeEditModal();
      } else {
        alert("Failed to update project.");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Something went wrong while updating the project.");
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="Projects">
      {/* Search Bar */}
      <div id="search">
        <input
          type="search"
          placeholder="Search Your Project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Add Project Button */}
      <div id="add-projects">
        <button id="add" onClick={openModal}>
          Add Project
        </button>
      </div>
      {/* Project Cards */}
      <div id="content">
        <div id="cards">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div className="card" key={project._id}>
                <div id="text-info">
                  <h1>{project.name}</h1>
                  <p>{project.description}</p>
                </div>
                <div id="manager">
                  <img
                    src={Edit}
                    alt="Edit"
                    title="Edit"
                    onClick={() => openEditModal(project)}
                  />
                  <Link to={"/Delete"}>
                    <img src={Delete} alt="Delete" title="Delete" />
                  </Link>
                  <Link to={"/task"}>
                    <button id="view-task">View Tasks</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit">Add Project</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeEditModal}>
              &times;
            </button>
            <h2>Edit Project</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Project Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit">Edit Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
