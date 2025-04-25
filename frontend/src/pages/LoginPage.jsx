import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
