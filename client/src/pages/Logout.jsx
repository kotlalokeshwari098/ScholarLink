import React from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router";

const UserLogout = () => {
  const token = localStorage.getItem("jetToken");
  const navigate = useNavigate();

  axiosInstance
    .get("/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  return <div>UserLogout</div>;
};

export default UserLogout;
