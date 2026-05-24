import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/tasks")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.tasks || res.data.data || [];

        setTasks(data);
      })
      .catch((err) => {
        console.log("TASKS ERROR:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      done: tasks.filter((task) => task.status === "done").length,
      doing: tasks.filter((task) => task.status === "doing").length,
      todo: tasks.filter((task) => !task.status || task.status === "todo")
        .length,
    };
  }, [tasks]);

  const statusClass = (status) => {
    if (status === "done") return "bg-green-50 text-green-700";
    if (status === "doing") return "bg-yellow-50 text-yellow-700";
    return "bg-slate-100 text-slate-700";
  };

  const getAssignee = (task) => {
    return (
      task.assignedTo?.name ||
      task.assignedTo?.email ||
      task.assignedTo ||
      "Not assigned"
    );
  };

  const getProject = (task) => {
    return task.project?.name || task.project || "General";
  };

  const getDueDate = (task) => {
    if (!task.dueDate) return "Not set";
    return new Date(task.dueDate).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-8">Task Manager</h2>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
          >
            View Tasks
          </button>

          <button
            onClick={() => navigate("/create-task")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Create Task
          </button>

          <button
            onClick={() => navigate("/create-project")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Create Project
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Projects
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-slate-500">Task Manager</p>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">Tasks</h1>
            <p className="text-sm text-slate-500 mt-2">
              View all tasks and track current status.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-task")}
            className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {stats.total}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Todo</p>
            <h3 className="text-3xl font-bold text-slate-700 mt-2">
              {stats.todo}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Doing</p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-2">
              {stats.doing}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Done</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {stats.done}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {loading ? (
            <p className="text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-slate-900">
                No tasks found
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Create your first task to start tracking work.
              </p>

              <button
                onClick={() => navigate("/create-task")}
                className="mt-5 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {task.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        {task.description || "No description added"}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${statusClass(
                        task.status
                      )}`}
                    >
                      {task.status || "todo"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 text-sm text-slate-600">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-700">Assignee</p>
                      <p className="mt-1 break-all">{getAssignee(task)}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-700">Project</p>
                      <p className="mt-1 break-all">{getProject(task)}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="font-semibold text-slate-700">Due Date</p>
                      <p className="mt-1">{getDueDate(task)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}