import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosConfig";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
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
        .get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data)
          setIsLoading(false);
          setUser(response.data);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err.message);
          localStorage.removeItem("token");
          navigate("/login");
        });
    })();
  }, [navigate, setUser, token]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return <>{!isLoading && children}</>;
};

export default UserProtectWrapper;
