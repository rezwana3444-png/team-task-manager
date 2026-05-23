import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SIGNUP CLICKED");
    console.log(formData);

    try {
      const res = await API.post("/auth/signup", formData);

      console.log("SIGNUP SUCCESS:", res.data);

      alert("Signup successful!");

    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("ERROR RESPONSE:", err.response);

      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        />

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

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Signup
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Signup;