import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data.projects || res.data || []))
      .catch((err) =>
        console.log("PROJECTS ERROR:", err.response?.data || err.message)
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Task Manager</h2>

        <div className="space-y-3">
          <button onClick={() => navigate("/dashboard")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Dashboard
          </button>
          <button onClick={() => navigate("/create-task")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Create Task
          </button>
          <button onClick={() => navigate("/create-project")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Create Project
          </button>
          <button onClick={() => navigate("/projects")} className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold">
            Projects
          </button>
          <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Task Manager</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Projects</h1>
          <p className="text-sm text-slate-500 mt-2">
            View and manage your project list.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {projects.length === 0 ? (
            <p className="text-slate-500">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition">
                  <h3 className="text-lg font-bold text-slate-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Project ID: {project._id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}