import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";
import JobCard from "../components/JobCard";
import { FaSearch } from "react-icons/fa";


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(["Frontend", "CSS", "JavaScript"  ]);

  const handleSkillClick = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill)); // Remove clicked skill
  };

  const handleClear = () => {
    setSelectedSkills([]); // Clear all selected skills
    setSearchTerm(""); // Reset search input
  };



  useEffect(() => {
    const getJobs = async () => {
      try {
        const { data } = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    getJobs();
  }, []);



  return (
    <>
    

    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" , border:"1px solid #ddd",borderRadius: "5px",margin:" 25px 8rem"}}>
      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "5px", padding: "8px", width: "100%" }}>
        <FaSearch style={{ marginRight: "8px", color: "#888" }} />
        <input
          type="text"
          placeholder="Type any job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: "none", outline: "none", flex: 1 }}
        />
      </div>
      <div style={{alignItems:"center",display:"flex",gap:"10px"}}>

      {/* Dropdown */}
      <select style={{ padding: "5px", borderRadius: "5px", width: "150px",textAlign: "center" }}>
        <option>Skills</option>
        <option>HTML</option>
        <option>CSS</option>
        <option>JavaScript</option>
        <option>Python</option>
        <option>SQL</option>
      </select>

      {/* Skills Section */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", textAlign:"center"}}>
        {selectedSkills.map((skill, index) => (
          <span
            key={index}
            onClick={() => handleSkillClick(skill)}
            style={{
              background: "lightpink",
              color: "black",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "1px solid #ddd"
            }}
          >
            {skill} ✖
          </span>
        ))}
        </div>
      </div>

      <div style={{textAlign:"right",display:"flex",justifyContent:"flex-end"}}>

      {/* Apply Filter & Clear Buttons */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px",textAlign: "right" }}>
        <button style={{ padding: "8px 15px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Apply Filter
        </button>
        <button
          onClick={handleClear}
          style={{ padding: "8px 15px", background: "transparent", color: "red", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>
      </div>
    </div>
    
    <div>      
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      ) : (
        <p>No job listings available</p>
      )}
    </div>
    </>
  );
};

export default Home;
