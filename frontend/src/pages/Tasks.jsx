import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      const tasksData = Array.isArray(res.data)
        ? res.data
        : res.data.tasks || res.data.data || [];

      setTasks(tasksData);
    } catch (err) {
      console.log("TASKS ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditTask = async (task) => {
    const title = prompt("Enter new task title", task.title || "");
    if (!title || !title.trim()) return;

    const description = prompt(
      "Enter new task description",
      task.description || ""
    );

    try {
      const res = await API.put(`/tasks/${task._id}`, {
        title: title.trim(),
        description: description?.trim() || "",
        status: task.status || "todo",
      });

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      alert(err.response?.data?.error || "Task update failed");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Task delete failed");
    }
  };

  const handleStatusChange = async (task, status) => {
    try {
      const res = await API.put(`/tasks/status/${task._id}`, { status });

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      alert(err.response?.data?.error || "Status update failed");
    }
  };

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
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

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            Logout
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
                        {task.title || "Untitled Task"}
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

                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleStatusChange(task, "todo")}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-700"
                    >
                      Todo
                    </button>

                    <button
                      onClick={() => handleStatusChange(task, "doing")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Doing
                    </button>

                    <button
                      onClick={() => handleStatusChange(task, "done")}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Done
                    </button>
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