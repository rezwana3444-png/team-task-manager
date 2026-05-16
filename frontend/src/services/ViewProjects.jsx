import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.map((project) => (
        <div key={project._id}>
          <p>{project.name}</p>
        </div>
      ))}
    </div>
  );
}