import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-g2gr.onrender.com",
});

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/registration", userData);
    return response.data;
  } catch (error) {
    console.log(
      "Error Registering User:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await API.post("/login", loginData);
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    console.log("Token stored:", token);
    return response;
  } catch (error) {
    alert("Error:", error.response?.message || error.message);
    console.log("Error logging User:", error.response?.data || error.message);
    throw error;
  }
};

export const getCount = async () => {
  try {
    const resposne = await API.get("/api/dashboard");
    console.log("count the doc:", resposne.data);
    return resposne.data;
  } catch (error) {
    console.log("Error getting User:", error.response?.data || error.message);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await API.get("/user/userDetail");
    console.log("Project created successfully:", response);
    return response;
  } catch (error) {
    console.log("Error getting User:", error.response?.data || error.message);
    throw error;
  }
};
// console.log("chekcing things:", await getUser());

export const newProject = async (projectData) => {
  try {
    const response = await API.post("/Pro/Projects", projectData);
    console.log("Project created successfully:", response);
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Token expired. Redirecting to login...");
      alert("Session expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return;
    }
    alert(error.message);
    console.error(
      "Error creating project:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProject = async (updateData) => {
  try {
    const response = await API.put("/Pro/Projects/:id", updateData);
    console.log("Update Project:", response);
    return response;
  } catch (error) {
    console.log(
      "Error Updating Project:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAll = async () => {
  try {
    const response = await API.get("/Pro/allProjects");
    console.log("Response data:", response);
    return response;
  } catch (error) {
    console.log("Error fetching all projects", error);
  }
};

// export const getAll = async () => {
//   try {
//     const response = await API.get("/Pro/allProjects", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     if (!response) {
//       console.log("no response backend", response);
//     }
//     console.log("User-specific projects:", response.data); // Adjust for the data structure
//     return response.data; // Return only the project data
//   } catch (error) {
//     console.error("Error fetching user-specific projects:", error);
//     throw error; // Throw the error for further handling
//   }
// };

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const newTask = async (taskData) => {
  try {
    const task = await API.post("/Tas/Task", taskData);
    if (!task) return console.log("Fail to fetch task", task);
    return task;
  } catch (error) {
    console.log("Error creating Task:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await API.get("/Tas/allTask");
    console.log("Response data:", response);
    return response;
  } catch (error) {
    console.log("Error fetching all projects", error);
  }
};
