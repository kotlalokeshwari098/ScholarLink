import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosConfig";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  console.log(user);
  useEffect(() => {
    (async () => {
      await axiosInstance
        .get("/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("userdata",response.data)
          setIsLoading(false);
          setUser(response.data);
          // navigate("/home");
          console.log("user data",user)
        })
        .catch((err) => {
          console.log(err.message);
          localStorage.removeItem("token");
          navigate("/login");
        });
    })();
  }, [navigate, setUser, token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mb-3"></div>
          <div className="h-3 bg-gray-300 rounded w-32 mb-6"></div>
        </div>
        <div className="text-gray-500 mt-4 text-sm">Setting up your experience...</div>
      </div>
    );
  }

  return <>{!isLoading && children}</>;
};

export default UserProtectWrapper;
