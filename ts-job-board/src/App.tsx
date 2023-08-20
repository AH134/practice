import Card from "./components/Card";
import { useEffect, useState } from "react";
import { Job } from "./types";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobFilter, setJobFilter] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const filteredJobs = jobs.filter((job) => job.title.includes(jobFilter));

  const isJob = (jobs: Job[]): boolean => {
    const areAllJobs = jobs.every((job): job is Job => {
      return (
        Object.entries(job).length === 4 &&
        "title" in job &&
        "company" in job &&
        "requirements" in job &&
        "image" in job
      );
    });

    if (areAllJobs) {
      return true;
    }
    throw new Error("one of the jobs is not of type Job");
  };

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

  return (
    <>
      {loading ? (
        <div style={{ color: "white" }}>Loading</div>
      ) : (
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={jobFilter}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setJobFilter(e.target.value);
              }}
            />
          </div>

          <div className="d-flex">
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
      )}
    </>
  );
}

export default App;
