import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => nav("/create-project")}>Create Project</button>
      <button onClick={() => nav("/create-task")}>Create Task</button>
      <button onClick={() => nav("/projects")}>View Projects</button>
      <button onClick={logout}>Logout</button>

      <h3>Tasks</h3>
      {tasks.map((t) => (
        <div key={t._id}>
          <p>{t.title}</p>
          <p>{t.status}</p>
        </div>
      ))}
    </div>
  );
}