

import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      navigate(`/jobs/${job._id}`); // Go to job details page if authenticated
    }
  };

return (
  <div style={{margin:" 25px 8rem"}}>
<div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
{/* Company Logo */}
<img src={job.companyLogo} alt="Company Logo" style={{ width: "100px", height: "100px", borderRadius: "10%" }} />
  {/* Job Details */}
  <div style={{ flex: 1, marginLeft: "15px" }}>
    <h3>{job.position}</h3>
    <p style={{ flex: 1, marginRight: "15px" }}><FaUser /> {job.numberOfPositions}   {job.salary}
  <img 
    src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
    alt="India Flag" 
    style={{ width: "20px", height: "15px", marginRight: "5px" }} 
  />
  {job.location}

</p>
    
    
    <p style={{color:"red"}}>{job.jobType}</p>
    
  </div>

  {/* Skills Section */}
<div style={{ textAlign: "right" }}>
  {job.requirements.map((skill, index) => (
    <span
      key={index}
      style={{
        background:"lightpink", 
        color:"black" ,
        padding: "5px 10px",
        
        marginRight: "5px",
        display: "inline-block"
      }}
    >
      {skill}
    </span>

  ))}
  <br /><br />
  <button 
          onClick={handleViewDetails}
          style={{ background: "red", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}
        >
          View details
        </button>
  {/*<Link to={`/jobs/${job._id}`} style={{ background: "red", color: "white", padding: "10px", borderRadius: "5px", textDecoration: "none" }}>View details</Link>*/}

</div>


</div>

</div>
);
};

export default JobCard;