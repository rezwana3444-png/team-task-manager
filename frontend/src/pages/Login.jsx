import { useState } from "react";
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
      }

      alert("Login successful!");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;