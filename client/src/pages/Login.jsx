import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Collecting input from user
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Sending the data to backend for login
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        setResult("Login Successful!");
        navigate("/dashboard");
      } else {
        setResult(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setResult(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
        <p className="text-center text-red-500 mb-4">{result}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
