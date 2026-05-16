import { useState } from "react";
import API from "../services/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const create = async () => {
    try {
      const res = await API.post("/tasks", {
        title,
        description: "task",
        assignedTo,
        project: projectId,
        dueDate: "2026-05-20"
      });

      console.log("TASK CREATED:", res.data);
      alert("Task Created Successfully");

      // optional reset
      setTitle("");
      setProjectId("");
      setAssignedTo("");

    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
      alert("Task creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Task</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <br />

      <input
        placeholder="Assigned User ID"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <br />

      <button onClick={create}>Create Task</button>
    </div>
  );
}