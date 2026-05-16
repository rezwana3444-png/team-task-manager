import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import ViewProjects from "./pages/ViewProjects";
import CreateTask from "./pages/CreateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<ViewProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;