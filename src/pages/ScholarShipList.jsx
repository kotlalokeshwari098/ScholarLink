import React, { useEffect } from 'react'
import scholarshipsData from '../data'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ScholarShipList() {
const [datas,setDatas]=useState(' ')

  const data = scholarshipsData.map((countryName) =>
    countryName.universities.map((item) => (
      item.scholarships.map((items) => (
        // console.log(items)
        <Link to={`/scholarshiplist/${item.name}`}>
        <div className='border w-auto '>
          <p>{countryName.country}</p>
          <p>{item.name}</p>
          <p className='font-bold'>scholarshipName: {items.name}</p>
          <p>DegreeLevel: {items.degreeLevel}</p>
          <p>amount: {items.amount}</p>
          <p>deadline:{items.deadline}</p>
        </div>
         </Link> 
        
      ))
    ))
  )
  useEffect(()=>{
    setDatas(data);

  },[])
  console.log(data);
  // console.log(countryName);
  // console.log(scholarshipName)
  // console.log(scholarshipType)

  function submitData(e){
    e.preventDefault();

    const formData=new FormData(e.currentTarget)

    const country=formData.get('country');
    const universityName=formData.get('universityName');
    const type=formData.get('type');
    console.log(country,universityName,type)
    console.log(Object.fromEntries(formData))
     const countrySelect=scholarshipsData.filter((item)=>(
      item.country===country
     ))
     console.log(countrySelect[0])
     console.log(countrySelect[0].country)

     const universitySelect=countrySelect[0].universities.filter((item)=>item.name===universityName)
     console.log(universitySelect)

     const scholarshipType=universitySelect[0].scholarships.filter((item)=>item.degreeLevel===type)
     console.log(scholarshipType);

     const data=scholarshipType.length>0 ? 

    scholarshipType.map((item) =>
     <Link to={`/scholarshiplist/${item.name}`}>
    <div className='border w-auto'>
      <p>{country}</p>
          <p>{universitySelect[0].name}</p>
          <p className='font-bold'>scholarshipName: {item.name}</p>
          <p>DegreeLevel: {item.degreeLevel}</p>
          <p>amount: {item.amount}</p>
          <p>deadline:{item.deadline}</p>
    </div>
    </Link>) 
   
    : "No matching found"
   
    console.log(data)
    setDatas(data)
    
  }


  return (
    <div>     
      <form action="" onSubmit={submitData}>
      <select name="country" id="">
          <option value="Singapore">Singapore</option>
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
          <option value="Australia">Australia</option>
        </select>
        <select name="universityName" id="" >
          <option value="National University of Singapore (NUS)">National University of Singapore</option>
          <option value="Nanyang Technological University (NTU)">Nanyang Technological University</option>
          <option value="University of Toronto">University of Toronto</option>
          <option value="University of British Columbia (UBC)">University of British Columbia</option>
          <option value="Technical University of Munich (TUM)">Technical University of Munich</option>
          <option value="RWTH Aachen University">RWTH Aachen University</option>
          <option value="Harvard University">Harvard University</option>
          <option value="Stanford University">Stanford University</option>
          <option value="University of Melbourne">University of Melbourne</option>
          <option value="University of Sydney">University of Sydney</option>
        </select>
        <select name="type" id="" >
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Master's/PhD">Master's/PhD</option>
          <option value="Bachelor's/Master's">Bachelor's/Master's</option>
          <option value="">All Graduate Programs</option>
        </select>
        <button>Submit</button>

      </form>

      <div className='grid grid-cols-5 gap-5 '>
        {datas}
      </div>
    </div>

  )
}

export default ScholarShipList

