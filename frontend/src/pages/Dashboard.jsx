import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log("TASKS API RESPONSE:", res.data);

      // SAFE handling
      setTasks(res.data.tasks || res.data || []);
    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
  <div className="min-h-screen bg-gray-100 flex">

    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Task Manager</h2>

      <div className="space-y-3">
        <button onClick={() => nav("/create-project")} className="block text-left text-gray-600 hover:text-black">
          Create Project
        </button>

        <button onClick={() => nav("/create-task")} className="block text-left text-gray-600 hover:text-black">
          Create Task
        </button>

        <button onClick={() => nav("/projects")} className="block text-left text-gray-600 hover:text-black">
          View Projects
        </button>

        <button onClick={logout} className="block text-left text-red-500 hover:text-red-700">
          Logout
        </button>
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      {/* Tasks Card */}
      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="text-lg font-semibold mb-4">Tasks</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="font-medium">{t.title}</p>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    t.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : t.status === "in progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.status}
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