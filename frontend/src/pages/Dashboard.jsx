import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data.tasks || res.data || []))
      .catch((err) => console.log("TASK ERROR:", err.response?.data || err.message));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Task Manager</h2>

        <div className="space-y-3">
          <button onClick={() => navigate("/dashboard")} className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold">
            Dashboard
          </button>
          <button onClick={() => navigate("/create-task")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Create Task
          </button>
          <button onClick={() => navigate("/create-project")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Create Project
          </button>
          <button onClick={() => navigate("/projects")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Projects
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Overview</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{tasks.length}</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending</p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-2">
              {tasks.filter((task) => task.status === "todo").length}
            </h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {tasks.filter((task) => task.status === "done").length}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-slate-500">No tasks found</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task._id} className="flex justify-between items-center border border-slate-200 rounded-lg p-4">
                  <p className="font-semibold text-slate-900">{task.title}</p>
                  <span className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {task.status || "todo"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}