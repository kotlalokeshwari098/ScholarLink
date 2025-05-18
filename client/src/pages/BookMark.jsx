import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem('jwtToken')

  useEffect(() => {
    // Simulate loading bookmarks
    setTimeout(async() => {
      setLoading(false);
      // This would be replaced with actual API call
      try{
        let bookmarksData = await axios.get(
          "http://localhost:5656/auth/bookmark",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(bookmarksData.data)
        setBookmarks(bookmarksData.data)
      }
      catch(err){
        console.log(err.message)
      }
      
    }, 1000);

    
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Bookmarked Scholarships
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              {bookmarks.length} scholarships
            </span>
            <div className="h-6 w-px bg-gray-300 mx-2"></div>
            <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                filter_alt
              </span>
              <span className="text-sm">Sort</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
              </div>
            ))}
          </div>
        ) : bookmarks.length > 0 ? (
          // Bookmarks list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated with actual bookmarks */}
            {bookmarks.map((item)=>(
            
              <div className="mt-10 border-t pt-10">
                

                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="h-2 bg-blue-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                           {item.country_name}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                            {item.degree}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-1 text-gray-800">
                          {item.scholarship_name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                         {item.university_name}
                        </p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <span className="material-symbols-outlined">
                          bookmark
                        </span>
                      </button>
                    </div>

                    <p className="text-gray-700 mb-4">
                      {item.amount}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="text-red-600 text-sm font-medium">
                        <span className="material-symbols-outlined text-sm align-text-bottom mr-1">
                          event
                        </span>
                        {item.deadline}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-800 text-sm border border-gray-300 rounded px-3 py-1">
                          Remove
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-3 py-1">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="bg-white rounded-lg shadow p-10 text-center">
            <div className="flex justify-center mb-6">
              <span className="material-symbols-outlined text-gray-400 text-6xl">
                bookmark_border
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't bookmarked any scholarships yet. Browse scholarships
              and click the bookmark icon to save them for later.
            </p>
            <Link
              to="/scholarshiplist"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Browse Scholarships
              <span className="material-symbols-outlined ml-2">search</span>
            </Link>
          </div>
        )}

        {/* Sample Bookmarked Item (for preview only) */}
        {/* {bookmarks.length === 0 && !loading && (
          <div className="mt-10 border-t pt-10">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Example of a bookmarked scholarship:
            </h3>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="h-2 bg-blue-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                        Singapore
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                        Master's
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-1 text-gray-800">
                      NUS Research Scholarship
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      National University of Singapore
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>

                <p className="text-gray-700 mb-4">
                  Full tuition coverage with monthly stipend for research-based
                  programs.
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-red-600 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm align-text-bottom mr-1">
                      event
                    </span>
                    Deadline: Jan 31, 2025
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-gray-800 text-sm border border-gray-300 rounded px-3 py-1">
                      Remove
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-3 py-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default BookMark;
