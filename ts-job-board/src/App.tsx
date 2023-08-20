import Card from "./components/Card";
import { useEffect, useState } from "react";
import { Job, isJob } from "./types";
import Navbar from "./components/Navbar";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobFilter, setJobFilter] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const filteredJobs = jobs.filter((job) => job.title.includes(jobFilter));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res: Response = await fetch("http://localhost:3000/jobs");
        const jobs: Job[] = await res.json();
        isJob(jobs);
        setJobs(jobs);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div style={{ color: "white" }}>Loading</div>;
  }

  return (
    <div>
      <Navbar jobFilter={jobFilter} setJobFilter={setJobFilter} />
      <div className="d-flex flex-wrap">
        {filteredJobs.map((job: Job, idx: number) => (
          <Card
            key={idx}
            title={job.title}
            company={job.company}
            image={job.image}
            requirements={job.requirements}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
