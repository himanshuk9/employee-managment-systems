import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { userName, role, token } = useAuth();

  // 🔹 ADD THIS
  const [tasks, setTasks] = useState([]);

  // 🔹 ADD THIS
  useEffect(() => {
    if (role === "User") {
      axios
        .get("https://localhost:7164/api/tasks/mytask", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-slate-900/80 backdrop-blur-lg text-white p-10 rounded-2xl shadow-2xl max-w-4xl w-full">

       

        <div className="space-y-2 text-slate-300 mb-8 text-center">
          <p>
            Welcome back,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </p>
          <p>
            Your role:{" "}
            <span className="font-semibold text-indigo-400">{role}</span>
          </p>
        </div>

        {/* ADMIN SECTION – NO CHANGE */}
        {role === "Admin" && (
          <p className="text-center text-indigo-300">
            Admin Dashboard
          </p>
        )}

        {/* USER SECTION – ONLY TASK SHOW */}
        {role === "User" && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-emerald-300 mb-4 text-center">
              My Tasks
            </h2>

            {tasks.length === 0 && (
              <p className="text-center text-slate-400">
                No tasks assigned
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task) => (
  <div
    key={task.id}
    className="p-5 rounded-xl bg-emerald-600/20 border border-emerald-500 space-y-2"
  >
    {/* Title */}
    <span className="font-semibold text-white">Title:</span>{" "}
      {task.title}

    {/* Description */}
    <p className="text-sm text-slate-300">
      <span className="font-semibold text-white">Description:</span>{" "}
      {task.description}
    </p>

    {/* Status */}
    <p className="text-sm">
      Status:{" "}
      <span
        className={`font-semibold ${
          task.status === "Completed"
            ? "text-green-400"
            : "text-yellow-400"
        }`}
      >
        {task.status ?? "Pending"}
      </span>
                  </p>
                   {/* ✅ CREATED AT */}
    <p className="text-xs text-slate-400">
      <span className="font-semibold text-slate-300">
        Assigned On:
      </span>{" "}
      {task.createdAt
        ? new Date(task.createdAt).toLocaleString()
        : "-"}
    </p>

    {/* Due Date */}
    <p className="text-sm text-slate-300">
      Due Date:{" "}
      <span className="font-semibold text-white">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "Not Assigned"}
      </span>
    </p>
  </div>
))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
