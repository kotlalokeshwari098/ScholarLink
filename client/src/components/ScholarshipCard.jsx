import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { myBookmark } from "../pages/ScholarShipList";

function ScholarshipCard(prop) {
  // console.log(prop);
  // const value=useContext(myBookmark);
  // // console.log(value)
  // const flattened=value.flat(2)
  // // console.log(flattened)
  // const data=flattened.filter(item=>item.bookmark===true)
  // console.log(data)
 
  return (
    <div>
      <Link to={`/scholarshiplist/${prop.id}`}>
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
      <Button className="" >
        <span
          className="material-symbols-outlined "
          onClick={() => prop.onClick(prop.id)}
        >
          bookmark
        </span>
      </Button>
    </div>
  );
}

export default ScholarshipCard;
