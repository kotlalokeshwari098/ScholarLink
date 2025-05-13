import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function ScholarshipCard(prop) {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 mb-6 w-full max-w-sm mx-auto">
      {/* Bookmark Button */}
      <Button
        className="!absolute !top-3 !right-3 !min-w-0 !p-2 !rounded-full !bg-white !shadow-md hover:!bg-blue-100"
        onClick={() => prop.onClick(prop.id)}
        aria-label="Bookmark"
      >
        <span className="material-symbols-outlined text-blue-600 text-xl">
          bookmark
        </span>
      </Button>

      <Link to={`/scholarshiplist/${prop.id}`}>
        <div className="cursor-pointer">
          {/* Badges */}
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
              {prop.countryName}
            </span>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
              {prop.universityName}
            </span>
          </div>
          {/* Scholarship Name */}
          <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-1 leading-snug line-clamp-2">
            {prop.scholarshipName}
          </h2>
          {/* Details in column */}
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Degree:</span> {prop.degreeLevel}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Amount:</span> {prop.amount}
            </p>
          </div>
          {/* Deadline */}
          <div className="mb-1">
            <p className="text-gray-700 text-xs">
              <span className="font-semibold">Deadline:</span> {prop.deadline}
            </p>
          </div>
          {/* Footer */}
          <div className="flex justify-end">
            <span className="text-xs text-gray-400 italic">
              Click for details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ScholarshipCard;
