import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.projects || res.data.data || [];

        setProjects(data);
      })
      .catch((err) => {
        console.log("PROJECTS ERROR:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Task Manager</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Projects</h1>
          <p className="text-sm text-slate-500 mt-2">
            View and manage all project workspaces.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {loading ? (
            <p className="text-slate-500">Loading projects...</p>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-slate-900">
                No projects found
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Create your first project to start organizing tasks.
              </p>
              <button onClick={() => navigate("/create-project")} className="mt-5 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700">
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition">
                  <h3 className="text-lg font-bold text-slate-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 break-all">
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