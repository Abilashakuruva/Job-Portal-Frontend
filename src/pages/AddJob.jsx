import { useState,  useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { createJob } from "../services/api";
import { useNavigate } from "react-router-dom";



const AddJob = () => {
  const [formData, setFormData] = useState({ companyname: "", url: "", position: "", salary: "",location:"",description:"",aboutcompany:"",information:"",jobtype:"",remoteOffice:"" });
  const [successMessage, setSuccessMessage] = useState(""); 
  const { setShowNavbar } = useNavbar();
  const navigate = useNavigate(); 
  const [selectedSkills, setSelectedSkills] = useState(["JavaSrcipt", "React", "JavaScript","React"]);


  useEffect(() => {
    setShowNavbar(false); // Hide navbar on login page

    return () => setShowNavbar(true); // Show navbar when leaving login page
  }, [setShowNavbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob=await createJob(formData);
      
      setSuccessMessage("Job Added successful! Redirecting ...");

      setTimeout(() => {
        navigate("/dashboard",{ state: { newJob } })
      }, 2000); 
    } catch (error) {
      console.error("Job Addition failed:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Add job description</h1>
        

        <form onSubmit={handleSubmit}>

        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "1px" }}>
  <label style={{ width: "150px" }}>Company Name</label>
  <input  type="text" placeholder="Enter your company name here"  value={formData.companyname} onChange={(e) => setFormData({ ...formData, companyname: e.target.value })}
    style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px",width: "250px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "1px" }}>
  <label style={{ width: "150px"}}>Add Logo URL</label>
  <input type="url" placeholder="Enter the link"  value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
  />
</div>
<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "1px" }}>
  <label style={{ width: "150px" }}>Job position</label>
  <input type="text" placeholder="Enter job position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Monthly salary</label>
  <input type="text" placeholder="Enter Amount in rupees" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Job Type</label>
<select value={formData.jobtype} onChange={(e) => setFormData({ ...formData, jobtype: e.target.value })} style={{ padding: "5px", borderRadius: "5px", width: "150px", textAlign: "center" ,}}>
            <option>Select</option>
            <option>Full time</option>
            <option>Remote</option>
            <option>Part time</option>            
          </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Remote/office</label>
<select value={formData.remoteOffice} onChange={(e) => setFormData({ ...formData, remoteOffice: e.target.value })} style={{ padding: "5px", borderRadius: "5px", width: "150px", textAlign: "center" }}>
            <option>Select</option>
            <option>Office</option>
            <option>Remote</option>
                       
          </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Location</label>
  <input type="text" placeholder="Enter Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Job Description</label>
  <input type="textarea" placeholder="Type the job description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>About Company</label>
  <textarea placeholder="Type about your company" value={formData.aboutcompany} onChange={(e) => setFormData({ ...formData, aboutcompany: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Skills Required</label>
<select style={{ padding: "5px", borderRadius: "5px", width: "250px", textAlign: "center" }}>
            <option>Enter the must have sills</option>
            <option>JavaScript</option>
            <option>React</option>
                       
          </select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", textAlign: "center" ,marginLeft:"150px" }}>
            {selectedSkills.map((skill, index) => (
              <span
                key={index}
                onClick={() => handleSkillClick(skill)}
                style={{
                  display:"flex",
                  background: "lightpink",
                  color: "black",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  fontSize:"10px",
                  
                }}
              >
                {skill} ✖
              </span>
            ))}
          
          </div>

<div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
  <label style={{ width: "150px" }}>Information</label>
  <textarea type="text" placeholder="Enter the additional information" value={formData.information} onChange={(e) => setFormData({ ...formData, information: e.target.value })} style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}  />
</div>
<div style={{marginLeft:"15rem"}} className="button-container">
<button type="cancel" style={{marginRight:"5px" ,color:"gray",background:"transparent",border:"1px solid gray"}} onClick={() => navigate("/dashboard")} className="cancel-button">cancel</button>
<button type="submit"className="submit-button">+Add Job</button>
</div>

          
        </form>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
      
      <div className="login-image">
        <img src="assets/2.png" alt="Person" />
      </div>


    </div>
    

  )
}

export default AddJob;
