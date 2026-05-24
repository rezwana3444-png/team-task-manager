import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TOKEN IN PROJECTS:", localStorage.getItem("token"));

    API.get("/projects")
      .then((res) => {
        console.log("PROJECTS RESPONSE:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.projects || res.data.data || [];

        setProjects(data);
      })
      .catch((err) => {
        console.log("PROJECTS ERROR:", err.response?.status);
        console.log("PROJECTS ERROR DATA:", err.response?.data);
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
          <button onClick={() => navigate("/tasks")} className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            View Tasks
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
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-slate-500">Task Manager</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">Projects</h1>
            <p className="text-sm text-slate-500 mt-2">
              View and manage all project workspaces.
            </p>
          </div>

          <button onClick={() => navigate("/create-project")} className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700">
            Create Project
          </button>
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {project.name ||
                          project.title ||
                          project.projectName ||
                          project.projectTitle ||
                          "Untitled Project"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        {project.description || "No description added"}
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                      Project
                    </span>
                  </div>

                  <div className="mt-5 bg-slate-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-slate-500">
                      Project ID
                    </p>
                    <p className="text-sm text-slate-700 mt-1 break-all">
                      {project._id}
                    </p>
                  </div>

                  <pre className="text-xs bg-slate-100 p-3 rounded-lg mt-3 overflow-auto">
                    {JSON.stringify(project, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}