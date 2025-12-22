import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:7164/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setMessage(res.data || "User Registered Successfully");
      setData({ userName: "", userEmail: "", password: "" });
    } catch (err) {
      if (err.response?.data) {
        setMessage(err.response.data);
      } else {
        setMessage("Signup Failed");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            value={data.userName}
            placeholder="Enter your name"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="userEmail"
            value={data.userEmail}
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
