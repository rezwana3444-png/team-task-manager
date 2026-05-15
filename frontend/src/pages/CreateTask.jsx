import { useState } from "react";
import API from "../services/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const create = async () => {
    await API.post("/tasks/create", {
  title,
  description: "task",
  assignedTo,
  project,
  dueDate: "2026-05-20"
});

    alert("Task Created");
  };

  return (
    <div>
      <h2>Create Task</h2>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Project ID" onChange={(e) => setProjectId(e.target.value)} />
      <input placeholder="User ID" onChange={(e) => setAssignedTo(e.target.value)} />

      <button onClick={create}>Create</button>
    </div>
  );
}