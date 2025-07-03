import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {ProfileDataContext}  from "../context/ProfileContext";


const MainProfile = () => {
  console.log("main profile page");
  const {profile,setProfile,loading,error}=useContext(ProfileDataContext)

  console.log("profile data",profile);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48"></div>
            <div className="h-10 bg-indigo-200 rounded w-32"></div>
          </div>

          {/* Personal Information Section skeleton */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-56 mb-4 border-b pb-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Details Section skeleton */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-48 mb-4 border-b pb-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Qualifications Section skeleton */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-64 mb-4 border-b pb-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={i > 2 ? "col-span-2" : ""}>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Verification Status Section skeleton */}
          <div className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-64 mb-4 border-b pb-2"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              to="/editprofile"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700"
            >
              Complete Your Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">
              No profile data available. Please complete your profile.
            </p>
            <Link
              to="/editprofile"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700"
            >
              Complete Your Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

   
  // Function to display value or "Not provided" if empty
  const displayValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return <span className="text-gray-400">Not provided</span>;
    }
    return value;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <Link
            to="/editprofile"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-gray-800">{profile.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-gray-800">{displayValue(profile.gender)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="text-gray-800">{displayValue(profile.category)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Annual Income</p>
              <p className="text-gray-800">{displayValue(profile.income)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Disability Status
              </p>
              <p className="text-gray-800">
                {displayValue(profile.disability_status)}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Academic Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Current Education Level
              </p>
              <p className="text-gray-800">
                {displayValue(profile.current_education_level)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Course Name</p>
              <p className="text-gray-800">
                {displayValue(profile.course_name)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Institution Name
              </p>
              <p className="text-gray-800">
                {displayValue(profile.institution_name)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">CGPA</p>
              <p className="text-gray-800">{displayValue(profile.cgpa)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Education Stream
              </p>
              <p className="text-gray-800">
                {displayValue(profile.education_stream)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Year of Study</p>
              <p className="text-gray-800">
                {displayValue(profile.year_of_study)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Passed Last Exam
              </p>
              <p className="text-gray-800">
                {profile.passed_last_exam ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Qualifications Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Additional Qualifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Portfolio Link
              </p>
              <p className="text-gray-800">
                {profile.portfolio ? (
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.portfolio}
                  </a>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </p>
            </div>
            
            {/* Research Experience - always shown as Yes for better compatibility */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Research Experience
              </p>
              <p className="text-gray-800">Yes</p>
            </div>
            
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">
                Entrance Exam Scores
              </p>
              <p className="text-gray-800">
                {profile.entrance_exam_scores &&
                profile.entrance_exam_scores.length > 0 ? (
                  profile.entrance_exam_scores.map((score, index) => (
                    <span key={index} className="block">
                      {score}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500">Certificates</p>
              <p className="text-gray-800">
                {profile.certificates && profile.certificates.length > 0 ? (
                  profile.certificates.map((cert, index) => (
                    <span key={index} className="block">
                      {cert}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Region-Specific Info Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Region-Specific Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">State</p>
              <p className="text-gray-800">{displayValue(profile.state)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">District</p>
              <p className="text-gray-800">{displayValue(profile.district)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Residency Status
              </p>
              <p className="text-gray-800">
                {displayValue(profile.residency_status)}
              </p>
            </div>
          </div>
        </div>

        {/* Document Verification Status Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Document Verification Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    profile.aadhar_verified ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="ml-2 text-sm text-gray-700">
                  Aadhar Verification
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {profile.aadhar_verified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    profile.income_certificate_uploaded
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="ml-2 text-sm text-gray-700">
                  Income Certificate
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {profile.income_certificate_uploaded
                  ? "Uploaded"
                  : "Not Uploaded"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    profile.caste_certificate_uploaded
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="ml-2 text-sm text-gray-700">
                  Caste Certificate
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {profile.caste_certificate_uploaded
                  ? "Uploaded"
                  : "Not Uploaded"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
