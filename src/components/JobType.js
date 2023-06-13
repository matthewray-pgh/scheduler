import React, { useEffect, useState } from 'react';
import jobTypes from '../assets/jobTypeConfig.json';

import '../styles/JobType.scss';

export const JobType = ({jobId}) => {
  const [personJobs, setPersonJobs] = useState([]);

  useEffect(() => {
    const currentJobs = [];
    if (jobId === undefined || jobId === null || jobId.length <= 0) {
      setPersonJobs([jobTypes[0]]);
      return;
    }

    jobId.map((job) => {
      return currentJobs.push(jobTypes.find((x) => x.id === job));
    });
    setPersonJobs(currentJobs);
  }, [jobId]);

  return (
    personJobs.map((job, index) => {
      return (
        <div className="job-type" key={`${index}-${job.name}`}>
          <div className="job-type__content" style={{ backgroundColor: job.color }}>
            {job.name}
          </div>
        </div>
      );
    })
  );  
}