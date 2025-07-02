import React from "react";
import { Link } from "react-router-dom";
import scholarshipImage from "../assets/scholarshipImage.png"; // Placeholder image

function HomePage() {
  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with modern design */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block px-3 py-1 bg-blue-400 bg-opacity-30 rounded-full mb-5 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">
                🎓 Find Your Perfect Scholarship
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Discover Scholarships
              </span>
              <br />
              <span className="text-white">Tailored for You</span>
            </h1>

            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Navigate through global opportunities perfectly aligned with your
              profile,
              <br className="hidden sm:block" /> ambitions, and qualifications
              in just a few clicks.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/scholarshiplist"
                className="group bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                Explore Scholarships
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                to="/compatibility-check"
                className="relative overflow-hidden group bg-transparent border-2 border-white hover:border-blue-300 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                  Take Compatibility Test
                </span>
                <div className="absolute inset-0 w-full h-full bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            </div>

            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-blue-600 bg-gray-200"
                  ></div>
                ))}
              </div>
              <p className="ml-4 text-sm text-blue-100">
                <span className="font-bold">2,000+</span> students found
                scholarships this month
              </p>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-300 bg-opacity-20 rounded-lg rotate-12 backdrop-blur-sm"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-300 bg-opacity-20 rounded-lg -rotate-12 backdrop-blur-sm"></div>

            <img
              src={scholarshipImage}
              alt="Education Illustration"
              className="rounded-2xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 relative z-10"
            />

            <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm p-3 rounded-lg shadow-lg transform rotate-3">
              <div className="text-blue-800 font-semibold">
                Latest Scholarship
              </div>
              <div className="text-sm text-gray-600">
                Deadline: June 15, 2023
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced with modern design */}
      <div className="py-20 px-4 container mx-auto max-w-6xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 opacity-30 rounded-full -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 opacity-40 rounded-full translate-y-1/4 -translate-x-1/4"></div>

        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 mx-auto flex items-center justify-center max-w-max">
            <span className="text-sm font-medium text-blue-800">
              ✨ ScholarLink Benefits
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              What ScholarLink Offers
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto text-white">
                <span className="material-symbols-outlined text-3xl">quiz</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                Compatibility Test
              </h3>
              <p className="text-gray-600 text-center">
                Find scholarships that match your qualifications and interests.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto text-white">
                <span className="material-symbols-outlined text-3xl">
                  dashboard
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                Personalized Dashboard
              </h3>
              <p className="text-gray-600 text-center">
                Track your applications and get recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto text-white">
                <span className="material-symbols-outlined text-3xl">
                  bookmark
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                Bookmarking
              </h3>
              <p className="text-gray-600 text-center">
                Save scholarships for later and never miss deadlines.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto text-white">
                <span className="material-symbols-outlined text-3xl">
                  notifications
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                Notifications
              </h3>
              <p className="text-gray-600 text-center">
                Get timely alerts for deadlines and application status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Scholarships - Enhanced with modern design */}
      <div className="py-20 px-4 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute right-0 bottom-1/4 w-60 h-60 bg-indigo-200 opacity-30 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-block px-4 py-1 bg-indigo-100 rounded-full mb-4 mx-auto flex items-center justify-center max-w-max">
            <span className="text-sm font-medium text-indigo-800">
              🏆 Top Opportunities
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-16 text-gray-800 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              Popular Scholarships
            </span>
          </h2>

          <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar">
            {/* Scholarship Preview Cards */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      Singapore
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                      Master's
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">
                    NUS Research Scholarship
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Full tuition + monthly stipend for exceptional students
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-red-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Deadline: Jan 31, 2025
                    </span>
                    <Link
                      to="/scholarshiplist"
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center group"
                    >
                      View details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/scholarshiplist"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              View All Scholarships
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials - Enhanced with modern design */}
      <div className="py-20 px-4 container mx-auto max-w-5xl relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 opacity-50 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 opacity-50 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 mx-auto flex items-center justify-center max-w-max">
            <span className="text-sm font-medium text-blue-800">
              ❤️ Success Stories
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              What Our Users Say
            </span>
          </h2>

          <div className="bg-white p-8 rounded-2xl shadow-xl relative">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl">
              "
            </div>
            <blockquote className="text-xl text-gray-700 mb-8 text-center font-light leading-relaxed">
              ScholarLink helped me find and apply for a scholarship that I
              wouldn't have discovered otherwise. The process was simple, and
              now I'm pursuing my dream of studying abroad!
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gray-300 mr-4 border-2 border-indigo-500 shadow-md overflow-hidden">
                {/* User photo could go here */}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  Sarah Johnson
                </p>
                <p className="text-indigo-600 text-sm">
                  Master's Student, Singapore
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
