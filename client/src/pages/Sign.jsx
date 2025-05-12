import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Sign() {
  const [sign, setSign] = useState(true);
  const [account, setAccount] = useState("Already have account? Login");
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });
  const [result,setResult]=useState('')
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
      }).then(response=>{
        localStorage.setItem('jwtToken', response.data.token)
        navigate("/dashboard");
      
    })
       
    }

    else{
      axios
        .post(
          "http://localhost:5656/auth/login",
          {
            email: datas.email,
            password: datas.password,
          }
        )
        .then((response) =>{
          if(response.status===200){
            console.log(response);
            token = response.data.token;
            localStorage.setItem("jwtToken", response.data.token);
            setResult("Login Successful!")
            navigate("/dashboard");
          }
         else setResult(response.data.message)
          }
        );
        
    }
  }
useEffect(()=>{
  console.log(result)
},[result])

  return (
    <div>
      <form action="" onSubmit={(e)=>e.preventDefault()}>
        <h3 className="text-lg font-bold mb-4">{sign ? "Sign Up" : "Login In"}</h3>
        {/* <h2>create an account!</h2> */}
        <p>{result}</p>
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
