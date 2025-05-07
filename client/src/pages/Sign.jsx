import React, { useState } from "react";
import axios from 'axios';

function Sign() {
  const [sign, setSign] = useState(true);
  const [account, setAccount] = useState("Already have account? Login");
  // const [email,setEmail]=useState(' ');
  // const [password,setPassword]=useState(' ');
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

  function toggleRegister() {
    if (account === "Already have account? Login") {
      setSign(false);
      setAccount("Don't have an account? Sign Up");
    } else {
      setSign(true);
      setAccount("Already have account? Login");
    }
  }

  function settingData(e) {
    const { name, value } = e.target;
    setDatas({
      ...datas,
      [name]: value,
    });
  }
  function submitData(){
    if(sign){
        axios.post('http://localhost:5000/auth/register',{
           email:datas.email,
           password:datas.password
        },{
          headers:{
          'Content-Type':'application/json'
        }
      })
    }
    else{
      axios.post("http://localhost:5000/auth/login" ,{
        email:datas.email,
        password:datas.password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      });
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
