import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const profileRes = await API.get("/users/me");
        setUser(profileRes.data);
        setFormData({
          name: profileRes.data.name || "",
          username: profileRes.data.username || "",
          email: profileRes.data.email || "",
        });

        const usersRes = await API.get("/users");
        setUsers(usersRes.data.users || usersRes.data || []);
      } catch (err) {
        console.log("DASHBOARD ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await API.put("/users/me", formData);
      setUser(res.data.user);

      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      await API.delete("/users/me");
      localStorage.removeItem("token");
      alert("Account deleted successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Account delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-8">
          Task Manager
        </h2>

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
          <p className="text-sm font-medium text-slate-500">Account</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Manage your profile and view existing team users.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading dashboard...</p>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900">
                My Profile
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update your username or email.
              </p>

              {!user ? (
                <p className="text-slate-500 mt-6">Profile not found</p>
              ) : (
                <>
                  <form onSubmit={handleUpdate} className="space-y-5 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Username
                      </label>
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3"
                        placeholder="Enter your username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3"
                        placeholder="Enter your email"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>

                  <div className="border-t border-slate-200 mt-8 pt-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Delete Account
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                      This permanently removes your account.
                    </p>

                    <button
                      onClick={handleDeleteAccount}
                      className="mt-4 bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700"
                    >
                      Delete Account
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900">
                User Details
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Existing team members and account roles.
              </p>

              {users.length === 0 ? (
                <p className="text-slate-500 mt-6">No users found</p>
              ) : (
                <div className="space-y-4 mt-6">
                  {users.map((item) => (
                    <div
                      key={item._id}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <h3 className="font-bold text-slate-900">
                        {item.name || item.username || "Unnamed User"}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.email}
                      </p>

                      <span className="inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        {item.role || "member"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}