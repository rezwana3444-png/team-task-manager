import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-full max-w-md">

        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Task Manager
        </h1>

        <p className="text-gray-500 mb-8">
          Organize your projects and tasks easily
        </p>

        <div className="space-y-4">

          <button
            onClick={() => nav("/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <button
            onClick={() => nav("/register")}
            className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
          >
            Register
          </button>

        </div>
      </div>
    </div>
  );
}