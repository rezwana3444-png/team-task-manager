import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}