import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function ScholarShipInfo() {
  const [data,setData]=useState([])
  const id=useParams()
  console.log(id)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5656/scholarshiplist/${id.name}`
        );
        console.log(response.data.rows[0]);
        setData(response.data.rows[0]);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return (
    <div>
      <div className="card">
        <div className="info">Scholarship Info</div>
        <div className="info-card">
          <div>
            <h2>Country Name:</h2>
            <p>{data.country_name}</p>
          </div>
          <div>
            <h2>University Name:</h2>
            <p>{data.university_name}</p>
          </div>
          <div>
            <h2>Scholarship Name:</h2>
            <p>{data.ScholarShipInfo}</p>
          </div>
          <div>
            <h2>Degree:</h2>
            <p>{data.degree}</p>
          </div>
          <div>
            <h2>Eligible:</h2>
            <p>{data.eligible}</p>
          </div>
          <div>
            <h2>Amount:</h2>
            <p>{data.amount}</p>
          </div>
          <div>
            <h2>Deadline:</h2>
            <p>{data.deadline}</p>
          </div>
          <div className="criteria-content">
            {/* {Object.entries(data.criteria)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarShipInfo
