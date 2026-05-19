import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ADD THIS
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import ViewProjects from "./pages/ViewProjects";
import CreateTask from "./pages/CreateTask";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ADD THIS ROUTE */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<ViewProjects />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;