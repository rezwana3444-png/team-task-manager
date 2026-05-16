import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data.projects || res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project) => (
          <div key={project._id}>
            <p>{project.name}</p>
          </div>
        ))
      )}
    </div>
  );
}