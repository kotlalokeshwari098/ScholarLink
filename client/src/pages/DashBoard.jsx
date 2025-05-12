import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
    const navigate=useNavigate()
    const fetchUser=async()=>{
        try{
            const token=localStorage.getItem('jwtToken')
            const response = await axios.get('http://localhost:5656/auth/dashboard',{
              headers:{
                  "Authorization":`Bearer ${token}`
                }
            })
            console.log(response)
            if(response.status!==201){
                   navigate('/sign')
            }
        }catch(err){
            console.log(err.message)
            navigate("/sign");
        }
        
    }
    useEffect(()=>{
        fetchUser();
    },[])
  return (
    <div>
      welcome to dashboard
    </div>
  )
}

export default DashBoard
