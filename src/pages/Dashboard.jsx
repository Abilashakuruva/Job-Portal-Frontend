import { useContext, useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../services/api";
import { AuthContext } from "../context/AuthContext";

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
      <h1>My Job Listings</h1>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.position}</h3>
          <button onClick={() => handleDelete(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
