import Card from "./components/Card";
import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((json) => {
        setJobs(json);
        setLoading(false);
      });
  }, []);

  console.log(jobs);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div style={{ display: "flex" }}>
          <Card
            title={jobs[0].title}
            company={jobs[0].company}
            image={jobs[0].image}
            requirements={jobs[0].requirements}
          />
          <Card
            title={jobs[1].title}
            company={jobs[1].company}
            image={jobs[1].image}
            requirements={jobs[1].requirements}
          />
        </div>
      )}
    </>
  );
}

export default App;
