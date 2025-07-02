import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router";

const UserLogout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

 
    const token = localStorage.getItem("jwtToken");

    // Perform logout
    const logoutUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       console.log(response);
        localStorage.removeItem("token");


        navigate("/");
      } catch (err) {
        console.error("Logout failed:", err);
        setError("Failed to logout. Please try again.");


        localStorage.removeItem("token");
        navigate("/");
      }
    };

    useEffect(()=>{
      logoutUser();
    })


  // Show loading or error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {error ? "Logout Issue" : "Logging Out..."}
        </h2>

        {!error ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogout;
