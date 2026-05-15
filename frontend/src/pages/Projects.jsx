import { useEffect, useState } from "react";
import API from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const load = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.map((p) => (
        <div key={p._id}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}