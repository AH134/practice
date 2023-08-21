export type Job = {
  title: string;
  company: string;
  image: string;
  requirements: string[];
};

export const isJob = (jobs: Job[]): boolean => {
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
