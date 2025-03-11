import { useEffect, useState,useContext } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import { fetchJobById } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await fetchJobById(id);
      setJob(data);
        
      } catch (error) {
        console.error("Error fetching job details:", error);
}
      
    };
    getJob();
  }, [id]);

  if (!job) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
    {/* Navbar */}
    {/*<nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #ccc" }}>
      <h2>JobStation</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>User Profile</button>
        <button onClick={() => navigate("/logout")}>Logout</button>
      </div>
    </nav>*/}

    {/* Job Details */}
    <h2>{job.title}</h2>
    <p><strong>Location:</strong> {job.location}</p>
    <p><strong>Stipend:</strong> ₹{job.stipend}/month</p>
    <p><strong>Duration:</strong> {job.duration} months</p>

    <h3>About Company</h3>
    <p>{job.companyDescription}</p>

    <h3>About the job/internship</h3>
    <p>{job.description}</p>

    <h3>Skills Required</h3>
    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
      {job.skills.map((skill, index) => (
        <span key={index} style={{ background: "lightgray", padding: "5px 10px", borderRadius: "5px" }}>
          {skill}
        </span>
      ))}
    </div>

    <h3>Additional Information</h3>
    <p>{job.additionalInfo}</p>

    {/* Edit Job Button for Admins */}
    {user?.role === "admin" && (
      <button 
        onClick={() => navigate(`/edit-job/${id}`)} 
        style={{ marginTop: "20px", padding: "10px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Edit Job
      </button>
    )}
  </div>
);
};

export default JobDetails;

