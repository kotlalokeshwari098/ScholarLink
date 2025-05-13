import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [sign, setSign] = useState(true);
  const [account, setAccount] = useState("Already have an account? Login");
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  // Toggle between register and login
  function toggleRegister() {
    if (account === "Already have an account? Login") {
      setSign(false);
      setAccount("Don't have an account? Sign Up");
    } else {
      setSign(true);
      setAccount("Already have an account? Login");
    }
  }

  // Collecting input from user
  function settingData(e) {
    const { name, value } = e.target;
    setDatas({
      ...datas,
      [name]: value,
    });
  }

  // Sending the data to backend for register/login
  function submitData() {
    if (sign) {
      axios
        .post(
          "http://localhost:5656/auth/register",
          {
            email: datas.email,
            password: datas.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/dashboard");
        });
    } else {
      axios
        .post("http://localhost:5656/auth/login", {
          email: datas.email,
          password: datas.password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("jwtToken", response.data.token);
            setResult("Login Successful!");
            navigate("/dashboard");
          } else {
            setResult(response.data.message);
          }
        });
    }
  }

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-6">
          {sign ? "Sign Up" : "Login"}
        </h3>
        <p className="text-center text-red-500 mb-4">{result}</p>
        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={settingData}
              value={datas.email}
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={settingData}
              value={datas.password}
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={submitData}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4">
          <div
            onClick={toggleRegister}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {account}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
