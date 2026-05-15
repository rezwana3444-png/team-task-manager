import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}