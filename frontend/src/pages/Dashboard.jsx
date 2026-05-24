import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
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

    API.get("/users")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.users || res.data.data || [];

        setUsers(data);
      })
      .catch((err) => {
        console.log("USERS ERROR:", err.response?.data || err.message);
      });
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "done").length;
    const pending = tasks.filter((task) => task.status === "todo").length;
    const doing = tasks.filter((task) => task.status === "doing").length;

    return { total, completed, pending, doing };
  }, [tasks]);

  const userProgress = useMemo(() => {
    const groupedUsers = {};

    tasks.forEach((task) => {
      const userName =
        task.assignedTo?.name ||
        task.assignedTo?.email ||
        task.assignedTo ||
        "Unassigned";

      if (!groupedUsers[userName]) {
        groupedUsers[userName] = {
          name: userName,
          total: 0,
          completed: 0,
          pending: 0,
          doing: 0,
        };
      }

      groupedUsers[userName].total += 1;

      if (task.status === "done") groupedUsers[userName].completed += 1;
      else if (task.status === "doing") groupedUsers[userName].doing += 1;
      else groupedUsers[userName].pending += 1;
    });

    return Object.values(groupedUsers);
  }, [tasks]);

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
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
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
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">Overview</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-2">
            Track team users, task progress, and completion details.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading dashboard...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-slate-500">Total Tasks</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.total}
                </h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-slate-500">Completed</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  {stats.completed}
                </h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-slate-500">In Progress</p>
                <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.doing}
                </h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-slate-500">Pending</p>
                <h3 className="text-3xl font-bold text-slate-700 mt-2">
                  {stats.pending}
                </h3>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  User Details
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Team members and account roles.
                </p>
              </div>

              {users.length === 0 ? (
                <p className="text-slate-500">No users found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <h3 className="font-bold text-slate-900">
                        {user.name || "Unnamed User"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {user.email}
                      </p>
                      <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        {user.role || "member"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    User Progress
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Task distribution and completion by assigned user.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/tasks")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  View Tasks
                </button>
              </div>

              {userProgress.length === 0 ? (
                <p className="text-slate-500">No user progress available</p>
              ) : (
                <div className="space-y-4">
                  {userProgress.map((user) => {
                    const percent =
                      user.total === 0
                        ? 0
                        : Math.round((user.completed / user.total) * 100);

                    return (
                      <div
                        key={user.name}
                        className="border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900">
                              {user.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {user.completed} of {user.total} tasks completed
                            </p>
                          </div>

                          <span className="text-sm font-semibold text-blue-700">
                            {percent}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex gap-4 mt-3 text-sm text-slate-600">
                          <span>Done: {user.completed}</span>
                          <span>Doing: {user.doing}</span>
                          <span>Pending: {user.pending}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}