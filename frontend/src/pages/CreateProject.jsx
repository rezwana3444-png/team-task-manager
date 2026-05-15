import { useState } from "react";
import API from "../services/api";

export default function CreateProject() {
  const [name, setName] = useState("");

  const create = async () => {
    await API.post("/projects", { name });
    alert("Project Created");
  };

  return (
    <div>
      <h2>Create Project</h2>
      <input placeholder="Project Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={create}>Create</button>
    </div>
  );
}