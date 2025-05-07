import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Sign() {
  const [sign, setSign] = useState(true);
  const [account, setAccount] = useState("Already have account? Login");
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  // toggling to show the suitable option for user to register/login
  function toggleRegister() {
    if (account === "Already have account? Login") {
      setSign(false);
      setAccount("Don't have an account? Sign Up");
    } else {
      setSign(true);
      setAccount("Already have account? Login");
    }
  }
   
  // collecting input from user
  function settingData(e) {
    const { name, value } = e.target;
    setDatas({
      ...datas,
      [name]: value,
    });
  }

  // sending the data to backend for register/login
  function submitData(){
    let token;
    if(sign){
        axios.post('http://localhost:5656/auth/register',{
           email:datas.email,
           password:datas.password
        },{
          headers:{
          'Content-Type':'application/json'
        }
      }).then(response=>
        localStorage.setItem('jwtToken', response.data.token))
    }

    else{
      axios
        .post(
          "http://localhost:5656/auth/login",
          {
            email: "loki@gmail.com",
            password: datas.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:jwtToken
            },
          }
        )
        .then((response) =>
          token=response.data.token
          
        );
        if(token){
          localStorage.setItem("jwtToken", response.data.token);
          navigate('/home');
        }
    }
  }


  return (
    <div>
      <form action="" onSubmit={(e)=>e.preventDefault()}>
        <h3>{sign ? "Sign Up" : "Login In"}</h3>
        {/* <h2>create an account!</h2> */}
        <div>
          <input
            type="text"
            placeholder="Email"
            onChange={settingData}
            value={datas.email}
            name='email'
          />
          <input
            type="password"
            placeholder="*******"
            onChange={settingData}
            value={datas.password}
            name="password"
          />
        </div>

        <button onClick={submitData}>submit</button>
        <div className="">
          <div onClick={toggleRegister}>{account}</div>
        </div>
      </form>
    </div>
  );
}

export default Sign;
