import { useEffect, useState } from "react";
import API from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data.projects || res.data || []))
      .catch((err) => console.log("PROJECTS ERROR:", err.response?.data || err.message));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Task Manager</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Projects</h1>
          <p className="text-sm text-slate-500 mt-2">View and manage your project list.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {projects.length === 0 ? (
            <p className="text-slate-500">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project._id} className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition">
                  <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Project ID: {project._id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}