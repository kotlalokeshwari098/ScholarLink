import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosConfig";

function ScholarShipInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = useParams();
  console.log(id);

  useEffect(() => {
    const fetchScholarshipData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/scholarshiplist/${id.name}`);
        console.log(response.data.rows[0]);
        setData(response.data.rows[0]);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchScholarshipData();
  }, [id.name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <span className="material-symbols-outlined text-5xl text-red-500 mb-4">
            error
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Scholarship Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The scholarship information you're looking for could not be found.
          </p>
          <Link
            to="/scholarshiplist"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Return to Scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link to="/scholarshiplist" className="hover:text-blue-600">
            Scholarships
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{data.scholarship_name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="h-2 bg-blue-600"></div>
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {data.country_name}
              </span>
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                {data.university_name}
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                {data.degree}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data.scholarship_name}
            </h1>
            <p className="text-gray-600 mb-6">
              Offered by {data.university_name} in {data.country_name}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-red-600">
                <span className="material-symbols-outlined mr-2">event</span>
                <span className="font-medium">Deadline: {data.deadline}</span>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition">
                  <span className="material-symbols-outlined">bookmark</span>
                  <span>Save</span>
                </button>

                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  <span>Apply</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                About This Scholarship
              </h2>
              <div className="prose text-gray-700">
                <p>{data.eligible}</p>

                {data.criteria && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Eligibility Criteria
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(data.criteria || {}).map(
                        ([key, value], index) => (
                          <div key={index} className="flex">
                            <span className="material-symbols-outlined text-blue-600 mr-2">
                              check_circle
                            </span>
                            <span>
                              <strong>{key}:</strong> {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Quick Overview
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Award Amount
                  </h3>
                  <p className="text-gray-800 font-semibold">{data.amount}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Degree Level
                  </h3>
                  <p className="text-gray-800 font-semibold">{data.degree}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    University
                  </h3>
                  <p className="text-gray-800 font-semibold">
                    {data.university_name}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Country</h3>
                  <p className="text-gray-800 font-semibold">
                    {data.country_name}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Application Deadline
                  </h3>
                  <p className="text-gray-800 font-semibold">{data.deadline}</p>
                </div>
              </div>
            </div>

            {/* Take Compatibility Test Widget */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">
                Check Your Eligibility
              </h3>
              <p className="text-blue-600 text-sm mb-4">
                Take our compatibility test to see if you qualify for this
                scholarship.
              </p>
              <Link
                to="/compatibility-check"
                state={{ scholarshipId: id.name }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition block text-center"
              >
                Take Compatibility Test
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarShipInfo;
