import axios from "axios";


const API = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "https://job-portal-backend-2y1z.onrender.com/api"
});

export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
//export const fetchJobs = () => API.get("/jobs");
/*export const fetchJobs = async () => {
  return await axios.get(`${API}/jobs`);
};*/

export const fetchJobs = async () => {
  return {
    data: [
      {
        _id: "1",
        position: "Frontend Developer",
        companyLogo: "https://media.glassdoor.com/sqll/1490106/ripplehire-squarelogo-1604053587481.png",
        numberOfPositions:"11-50",
        location: "Delhi",
        jobType: "Office    Full time",
        salary: "₹50,000",
        description: "Seeking a Full Stack Developer with experience in MERN stack to build scalable web applications.",
        requirements: ["Frontend", "CSS", "JavaScript", "HTML"]
      },
      {
        _id: "2",
        position: "WordPress Developer",
        companyLogo: "https://pune.news/wp-content/uploads/2024/01/Ady-AI.webp",
        numberOfPositions:"11-50",
        location: "Bangalore",
        jobType: "Remote   Full time",
        salary: "₹25,000",
        description: "Looking for a Frontend Developer proficient in React.js to develop interactive UI components.",
        requirements: [ "CSS", "HTML", "WordPress"]
      },
      {
        id: 3,
        position: "Frontend Developer",
        companyLogo: "https://pbs.twimg.com/profile_images/1466013889695412230/fevwBLEY_400x400.jpg",
        numberOfPositions:"11-50",
        location: "Mumbai",
        jobType: "Office   Full time",
        salary: "₹35,000",
        description: "Hiring an experienced Backend Developer to build and optimize APIs using Node.js and Express.",
        requirements: ["Frontend", "CSS", "JavaScript", "HTML"]
      },
      
    ]
  };
};


/*
export const createJob = (jobData, token) =>
  API.post("/jobs", jobData, { headers: { Authorization: token } });*/

const API_URL = "http://localhost:5000/api/jobs";

export const createJob = async (formData) => {
  const token = localStorage.getItem("token"); // Retrieve token
  return await axios.post("/api/jobs", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Ensure the token is sent
      "Content-Type": "application/json",
    },
  });
};


//export const fetchJobById = (id) => API.get(`/jobs/${id}`);
export const fetchJobById = async (id) => {
  return await axios.get(`http://localhost:5000/api/jobs/${id}`);
};

export const updateJob = (id, jobData, token) =>
  API.put(`/jobs/${id}`, jobData, { headers: { Authorization: token } });
export const deleteJob = (id, token) =>
  API.delete(`/jobs/${id}`, { headers: { Authorization: token } });
