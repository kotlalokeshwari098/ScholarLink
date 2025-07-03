import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosConfig";
import clsx from 'clsx'

function ScholarshipCard(prop) {
  const [book,setBook]=useState(false)
  let token=localStorage.getItem('jwtToken')

  async function bookmark() {
   !book ? setBook(true) :setBook(false)
  
    
    try{
      let bookmarks = await axiosInstance.post(
        "/auth/bookmarking",
        {
          bookmark_id: prop.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(bookmarks)
    }
    catch(err){
      console.log(err.message)
    }
   
  }
  // useEffect(()=>{
  //   console.log(book);
  // },[book])

  return (
    <div className="group relative flex flex-col min-h-[280px] rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {/* Top color accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>

      {/* Bookmark button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prop.onClick(prop.id);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        aria-label="Bookmark scholarship"
      >
        <span
          // className="material-symbols-outlined text-blue-600  "
          className={clsx(
            "material-symbols-outlined",
            book ? "text-blue-600" : "text-gray-400"
          )}
          onClick={bookmark}
        >
          {book ? "bookmark" : "bookmark_border"}
        </span>
      </button>

      <Link
        to={`/scholarshiplist/${prop.id}`}
        className="p-5 flex flex-col h-full"
      >
        {/* Header section with consistent spacing */}
        <div className="mb-2">
          {/* Location & Type Tags - always at the top */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {prop.countryName}
            </span>
            <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {prop.degreeLevel}
            </span>
          </div>

          {/* University name with ellipsis for long names */}
          <p className="text-sm text-gray-500 font-medium truncate">
            {prop.universityName}
          </p>
        </div>

        {/* Scholarship title - allowing more space but still maintaining consistency */}
        <h2 className="text-lg font-bold text-gray-800 leading-tight mb-3 line-clamp-3 group-hover:text-blue-700 transition-colors">
          {prop.scholarshipName}
        </h2>

        {/* Award amount - pushed down to create consistent space */}
        <div className="mt-auto mb-4">
          <div className="flex items-center">
            <span className="material-symbols-outlined text-green-600 mr-1.5 text-lg">
              payments
            </span>
            <span className="font-semibold text-gray-700 truncate">
              {prop.amount}
            </span>
          </div>
        </div>

        {/* Footer - always at the bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Deadline */}
          <div className="flex items-center">
            <span className="material-symbols-outlined text-red-500 mr-1 text-sm">
              event
            </span>
            <p className="text-xs text-gray-600">
              <span className="font-medium text-red-600">{prop.deadline}</span>
            </p>
          </div>

          {/* View details button */}
          <span className="text-blue-600 text-xs font-medium flex items-center">
            View details
            <span className="material-symbols-outlined ml-0.5 text-sm">
              arrow_forward
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ScholarshipCard;
