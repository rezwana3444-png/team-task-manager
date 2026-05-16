import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setMessage(JSON.stringify(res.data));
        setProjects(res.data.projects || res.data);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Error");
      });
  }, []);

  return (
    <div>
      <h1>Projects</h1>

      <p>{message}</p>

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