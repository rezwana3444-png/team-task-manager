import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        setMessage(JSON.stringify(res.data));
        setTasks(res.data.tasks || res.data);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Error");
      });
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

      <p>{message}</p>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>
          </div>
        ))
      )}
    </div>
  );
}