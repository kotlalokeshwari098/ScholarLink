import React from 'react'
import scholarshipsData from '../data'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ScholarShipList() {
  const [countryName,setCountryName]=useState('');
  const [scholarshipName,setScholarshipName]=useState('');
  const [scholarshipType,setScholarshipType]=useState('');

  const data = scholarshipsData.map((countryName) =>
    countryName.universities.map((item) => (
      item.scholarships.map((items) => (
        // console.log(items)
        // <Link to={`/scholarshiplist/${item.name}`}>
        <div className='border w-auto '>
          <p>{countryName.country}</p>
          <p>{item.name}</p>
          <p className='font-bold'>scholarshipName: {items.name}</p>
          <p>DegreeLevel: {items.degreeLevel}</p>
          <p>amount: {items.amount}</p>
          <p>deadline:{items.deadline}</p>
        </div>
        // {/* </Link> */}
        
      ))
    ))
  )
  console.log(data);
  console.log(countryName);
  console.log(scholarshipName)
  console.log(scholarshipType)

  // function selectTheCountry(){

  // }
  return (
    <div>     
        <select name="" id="" onChange={(e)=>setCountryName(e.target.value)}>
          <option value="Singapore">Singapore</option>
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
          <option value="Australia">Australia</option>
        </select>
        <select name="scholarshipName" id="" onChange={(e)=>setScholarshipName(e.target.value)}>
          <option value="National University of Singapore">National University of Singapore</option>
          <option value="Nanyang Technological University">Nanyang Technological University</option>
          <option value="University of Toronto">University of Toronto</option>
          <option value="University of British Columbia">University of British Columbia</option>
          <option value="Technical University of Munich">Technical University of Munich</option>
          <option value="RWTH Aachen University">RWTH Aachen University</option>
          <option value="Harvard University">Harvard University</option>
          <option value="Stanford University">Stanford University</option>
          <option value="University of Melbourne">University of Melbourne</option>
          <option value="University of Sydney">University of Sydney</option>
        </select>
        <select name="" id="" onChange={(e)=>setScholarshipType(e.target.value)}>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Master's/PhD">Master's/PhD</option>
          <option value="Bachelor's/Master's">Bachelor's/Master's</option>
          <option value="">All Graduate Programs</option>
        </select>
        <button>Submit</button>
       

      <div className='grid grid-cols-5 gap-5 '>
        {data}
      </div>
    </div>

  )
}

export default ScholarShipList

{/* <div>
         <p>scholarshipName: {items.name}</p>
         <p>DegreeLevel: {items.degreeLevel}</p>
         <p>amount: {items.amount}</p>
         <p>deadline:{items.deadline}</p>
      </div> */}
