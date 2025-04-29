import React, { useEffect } from 'react'
import scholarshipsData from '../data'
import ScholarshipCard from '../components/ScholarshipCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ScholarShipList() {
  const [dataInitial,setDataInitial]=useState([])
  const [isFiltered,setIsFiltered]=useState(false);
  const [filteredData,setFilteredData]=useState([])


    // const data = 



  useEffect(()=>{
    setDataInitial(scholarshipsData)
  },[])
 
  // console.log(scholarshipsData);

  function submitData(e){
    e.preventDefault();
    setIsFiltered(true);

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

     const fullScholarshipData = scholarshipType.map((sch) => ({
      items: sch,
      universityName: universitySelect,
      countryName: countrySelect
    }));
  
    setFilteredData(fullScholarshipData);
    setIsFiltered(true);
    
  }
  // console.log(filteredData);
  console.log(dataInitial);


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
      <button onClick={()=>setIsFiltered(false)}>clear</button>

      <div className='grid grid-cols-5 gap-5 '>
        {isFiltered ? 

         filteredData.map((data,index) =>
         <ScholarShipList 
           items={data.items} countryName={data.country} universityName={data.universitySelect} id={items}/>
         ) :
         dataInitial.map((countryName) =>
          countryName.universities.map((universityName) => (
            universityName.scholarships.map((items) => (
              // console.log(items)
              
               <ScholarshipCard universityName={universityName} countryName={countryName} items={items} id={items}/>
              
            ))
          ))
        )
         
        }
      </div>
    </div>

  )
}

export default ScholarShipList

