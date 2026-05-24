import { useState } from "react";
import API from "../services/api";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const createProject = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a project name");
      return;
    }

    try {
      setLoading(true);
      await API.post("/projects", { name: name.trim() });
      alert("Project created successfully");
      setName("");
    } catch (err) {
      console.log("PROJECT ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Project creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Task Manager</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Create Project</h2>
          <p className="text-sm text-slate-500 mt-2">Create a project to organize your team tasks.</p>
        </div>

        <form onSubmit={createProject} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Name
            </label>
            <input
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}