import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", formData);

    const token =
      res.data.token ||
      res.data.accessToken ||
      res.data.jwt ||
      res.data.data?.token;

    if (!token) {
      alert("Login failed. No token received.");
      return;
    }

    localStorage.setItem("token", token);
    window.location.href = "/dashboard";
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        />
        
        <button
  type="submit"
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>
  Login
</button>

<button
  type="button"
  onClick={() => alert("Please contact admin to reset your password.")}
  className="text-sm text-blue-600 font-semibold mt-4 w-full"
>
  Forgot password?
</button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;