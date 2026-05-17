import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    // 1. Prevent the page from reloading
    e.preventDefault(); 

    try {
      // 2. Perform the request
      const res = await API.post("/auth/login", { email, password });
      
      // 3. Save token only if response exists
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        nav("/dashboard");
      }
    } catch (err) {
      // 4. Debugging: This will show you EXACTLY why it failed in the console
      console.error("Full Error:", err);
      alert("Login Failed: " + (err.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      {/* 5. Wrap in a form to handle 'Enter' key and onSubmit */}
      <form onSubmit={handleLogin}>
        <input 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br />
        <input 
          placeholder="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}