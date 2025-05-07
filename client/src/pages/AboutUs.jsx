import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function AboutUs() {
    const [data,setData]=useState()
  axios.get('http://localhost:5000/')
  .then(res=>console.log(res.data))
  .catch(err => console.error('Error:', err))



  return (
    <div>
      
    </div>
  )
}

export default AboutUs
