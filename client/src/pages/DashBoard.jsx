import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DashBoard() {
  const navigate = useNavigate();
  const [loggedIn,setLoggedIn]=useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:5656/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status !== 201) {
        setLoggedIn(false)
        navigate("/sign");
      }
      setLoggedIn(true)
    } catch (err) {
      console.log(err.message);
      setTimeout(() => {
        navigate("/sign");
        
      }, 2000);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);


  return <div>
    {loggedIn ? <div>welcome to dashboard🎉</div> :<div>Need to login/signup to view the dashboard🙌</div>}
    
  </div>
    
  
}

export default DashBoard
