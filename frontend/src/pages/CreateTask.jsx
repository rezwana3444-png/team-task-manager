import { useState } from "react";
import API from "../services/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/tasks/create", {
        title: title.trim(),
        description: description.trim(),
      });

      alert("Task created successfully");

      setTitle("");
      setDescription("");

      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Task Manager</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Create Task
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Add a task quickly without entering project or user IDs.
          </p>
        </div>

        <form onSubmit={create} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Title
            </label>
            <input
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}