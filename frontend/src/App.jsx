import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import ViewProjects from "./pages/ViewProjects";
import CreateTask from "./pages/CreateTask";
import CreateProject from "./pages/CreateProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* MAIN */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* TASKS */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-task" element={<CreateTask />} />

        {/* PROJECTS */}
        <Route path="/projects" element={<ViewProjects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/profile" element={<Profile />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;