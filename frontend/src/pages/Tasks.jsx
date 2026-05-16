import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data.tasks || res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

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