import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me")
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          username: res.data.username || "",
          email: res.data.email || "",
        });
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to load profile");
      })
      .finally(() => {
        setLoading(false);
      });
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

      await API.put("/users/me", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
      });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

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
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            View Tasks
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold"
          >
            Profile
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
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">Account</p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Profile</h1>
          <p className="text-sm text-slate-500 mt-2">
            Update your username, email, or delete your account.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-xl">
          <form onSubmit={handleUpdate} className="space-y-5">
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
            <h2 className="text-lg font-bold text-slate-900">Delete Account</h2>
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
        </div>
      </main>
    </div>
  );
}