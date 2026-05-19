import axios from "axios";

const API = axios.create({
  // Use the full URL that ends in .railway.app
  baseURL: "https://team-task-manager-production-44de.up.railway.app/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;