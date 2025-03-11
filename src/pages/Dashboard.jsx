import { useContext, useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Home from "./Home";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await fetchJobs();
      setJobs(data.filter((job) => job.postedBy === user.id));
    };
    getJobs();
  }, [user]);

  const handleDelete = async (id) => {
    await deleteJob(id, localStorage.getItem("token"));
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div>
      <Home/>
      
      <h1> Job Listings</h1>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />     
        

      ))}
    </div>
  );
};

export default Dashboard;
