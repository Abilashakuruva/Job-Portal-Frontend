import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      const { data } = await fetchJobById(id);
      setJob(data);
    };
    getJob();
  }, [id]);

  if (!job) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{job.position}</h1>
      <p>{job.description}</p>
    </div>
  );
};

export default JobDetails;
