import React, { useEffect } from "react";
import scholarshipsData from "../data";
import ScholarshipCard from "../components/ScholarshipCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { createContext } from "react";
import BookMark from "./BookMark";
import axios from 'axios'

export const myBookmark = createContext();

function ScholarShipList() {
  const [dataInitial, setDataInitial] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);

  useEffect(() => {
     (async()=>{
      try{
         const response=await axios.get('http://localhost:5656/scholarships')
         console.log(response.data.rows)
         setDataInitial(response.data.rows)

      }
      catch(err){
        console.log(err.message);
      }
     })()
  }, []);

  // console.log(scholarshipsData);
  // function toggleBookMark(id) {

  // }
  // console.log(bookMarkList);

  async function submitData(e) {
    e.preventDefault();
    setIsFiltered(true);

    const formData = new FormData(e.currentTarget);

    const country = formData.get("country");
    const universityName = formData.get("universityName");
    const type = formData.get("type");
   
    try{
      const result = await axios.get(`http://localhost:5656/scholarshipfilter?country=${country}&university=${universityName}&degree=${type}`);
        console.log(result)
        setFilteredData(result.data.rows);
    }
    catch(err){
      console.log(err.status)
      console.log(err.message);
    }
   
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
        <select name="universityName" id="">
          <option value="National University of Singapore (NUS)">
            National University of Singapore
          </option>
          <option value="Nanyang Technological University (NTU)">
            Nanyang Technological University
          </option>
          <option value="University of Toronto">University of Toronto</option>
          <option value="University of British Columbia (UBC)">
            University of British Columbia
          </option>
          <option value="Technical University of Munich (TUM)">
            Technical University of Munich
          </option>
          <option value="RWTH Aachen University">RWTH Aachen University</option>
          <option value="Harvard University">Harvard University</option>
          <option value="Stanford University">Stanford University</option>
          <option value="University of Melbourne">
            University of Melbourne
          </option>
          <option value="University of Sydney">University of Sydney</option>
        </select>
        <select name="type" id="">
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Master's/PhD">Master's/PhD</option>
          <option value="Bachelor's/Master's">Bachelor's/Master's</option>
          <option value="">All Graduate Programs</option>
        </select>
        <button>Submit</button>
      </form>
      <button onClick={() => setIsFiltered(false)}>clear</button>

      <div className="grid grid-cols-5 gap-5 ">
        {isFiltered
          ? filteredData.map((item,index) => (
              // console.log(data)
              // <myBookmark.Provider value={bookMarkList}>
              <ScholarshipCard
                key={index}
                id={index}
                //  items={data.items}
                universityName={item.university_name}
                countryName={item.country_name}
                amount={item.amount}
                deadline={item.deadline}
                scholarshipName={item.scholarship_name}
                degreeLevel={item.degree}
                onClick={()=>toggleBookMark(item.id)}
                eligible={item.eligible}
              />
              // </myBookmark.Provider>
            ))
          : dataInitial.map((item,index) => (
              <ScholarshipCard
                key={index}
                id={item.id}
                universityName={item.university_name}
                countryName={item.country_name}
                amount={item.amount}
                deadline={item.deadline}
                scholarshipName={item.scholarship_name}
                degreeLevel={item.degree}
                onClick={()=>toggleBookMark(item.id)}
                eligible={item.eligible}
              />
            ))}
      </div>
    </div>
  );
}

export default ScholarShipList;
