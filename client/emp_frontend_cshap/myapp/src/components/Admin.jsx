import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  // 🔹 Task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // ✅ ADDED

  // GET all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7164/api/admin/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 OPEN task form
  const openTaskForm = (user) => {
    setSelectedUser(user);
    setShowTaskForm(true);
  };

  // 🔹 ASSIGN TASK API
  const assignTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://localhost:7164/api/tasks/assign",
        {
          title,
          description,
          dueDate, // ✅ ADDED
          userId: selectedUser.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Task Assigned Successfully ✅");

      // reset
      setTitle("");
      setDescription("");
      setDueDate(""); // ✅ ADDED
      setSelectedUser(null);
      setShowTaskForm(false);
    } catch (err) {
      console.error("Error assigning task", err);
      alert("Task assign failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        Admin <span className="text-indigo-400">Panel</span>
      </h1>

      {/* USERS TABLE */}
      <div className="overflow-x-auto bg-slate-900/80 rounded-2xl p-6">
        <table className="w-full">
          <thead>
            <tr className="text-indigo-300 border-b border-slate-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-700">
                <td className="p-3">{user.userName}</td>
                <td className="p-3">{user.userEmail}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => openTaskForm(user)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-sm"
                  >
                    Assign Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TASK ASSIGN MODAL */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <form
            onSubmit={assignTask}
            className="bg-slate-900 p-6 rounded-xl w-96"
          >
            <h2 className="text-xl font-bold mb-4">
              Assign Task to {selectedUser.userName}
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 bg-slate-800 p-2 rounded"
              required
            />

            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 p-2 rounded mb-3"
              required
            />

            {/* ✅ DUE DATE INPUT */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-800 p-2 rounded mb-4"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-1 bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-indigo-600 rounded"
              >
                Assign
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
