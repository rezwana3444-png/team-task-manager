import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔥 INTERCEPTOR RUNNING");
  console.log("TOKEN:", token);

  if (token) {
    config.headers = config.headers || {};

    config.headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("HEADERS:", config.headers);

  return config;
});

export default API;