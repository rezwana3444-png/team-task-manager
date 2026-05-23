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

    console.log("LOGIN CLICKED");
    console.log("LOGIN DATA:", formData);

    try {
      const res = await API.post("/auth/login", formData);

      console.log("LOGIN SUCCESS:", res.data);

      // If token exists, store it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("TOKEN SAVED");
        window.location.href = "/dashboard";
      }

      alert("Login successful!");
    } catch (err) {
      console.log("FULL ERROR:", err);
console.log("ERROR DATA:", err.response?.data);
alert(JSON.stringify(err.response?.data));

      alert("Login failed");
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