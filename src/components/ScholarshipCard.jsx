import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function ScholarshipCard(prop) {
  // console.log(prop);
 
  return (
    <div>
      <Link to={`/scholarshiplist/${prop.scholarshipName}`}>
        <div className="border w-auto flex ">
          <div>
            <p>country name:{prop.countryName}</p>
            <p>university name:{prop.universityName}</p>
            <p className="font-bold">scholarshipName: {prop.scholarshipName}</p>
            <p>DegreeLevel: {prop.degreeLevel}</p>
            <p>amount: {prop.amount}</p>
            <p>deadline:{prop.deadline}</p>
          </div>
        </div>
      </Link>
      <div className="">
        <span
          className="material-symbols-outlined "
          onClick={() => prop.onClick(prop.id)}
        >
          bookmark
        </span>
      </div>
    </div>
  );
}

export default ScholarshipCard;
