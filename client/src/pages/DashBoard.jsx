import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

function DashBoard() {
  const {bookmarks,setBookmarks}=useContext(BookmarkContext)

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status !== 201) {
        setLoggedIn(false);
        navigate("/signup");
      }
      setUserData(response.data.user || {});
      setLoggedIn(true);
      setLoading(false);
      navigate('/dashboard')
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setLoggedIn(false);
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 h-20 w-20 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-36"></div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">
            <span className="material-symbols-outlined">lock</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to login or sign up to view your dashboard.
          </p>
          <Link
            to="/signup"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    );
  }

  // Dashboard content when logged in
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
          <p className="text-blue-100">
            Track your scholarship journey and manage your applications
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Bookmarks</h3>
              <span className="material-symbols-outlined text-blue-600">
                bookmark
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {bookmarks.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Saved scholarships</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Applications
              </h3>
              <span className="material-symbols-outlined text-green-600">
                description
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">In progress</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Compatibility
              </h3>
              <span className="material-symbols-outlined text-purple-600">
                analytics
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">Tests taken</p>
          </div>
        </div>

        {/* Compatibility Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Scholarship Compatibility
            </h2>
            <Link
              to="/scholarshiplist"
              className="text-blue-600 text-sm font-medium hover:underline flex items-center"
            >
              Take the test{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">
              quiz
            </span>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No compatibility data yet
            </h3>
            <p className="text-gray-500 mb-4">
              Take the compatibility test to find scholarships that match your
              profile
            </p>
            <Link
              to="/scholarshiplist"
              className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Start Test
            </Link>
          </div>
        </div>

        {/* Recent Bookmarks */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Bookmarks
            </h2>
            <Link
              to="/bookmark"
              className="text-blue-600 text-sm font-medium hover:underline flex items-center"
            >
              View all{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                arrow_forward
              </span>
            </Link>
          </div>

          {bookmarks.length > 0 ? (
            // Bookmarks list
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would be populated with actual bookmarks  */}
              {bookmarks.map((item) => (
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

                      <p className="text-gray-700 mb-4">{item.amount}</p>

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
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">
                bookmark_border
              </span>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Save scholarships to access them quickly later
              </p>
              <Link
                to="/scholarshiplist"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Browse Scholarships
              </Link>
            </div>
          )}
        </div>

        {/* Pending Actions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-500 text-3xl">
              info
            </span>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                Complete Your Profile
              </h3>
              <p className="text-amber-700 mb-3">
                Add education and personal details to improve scholarship
                matching
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm transition duration-300">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
