import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  console.log(import.meta.env.VITE_BASE_URL)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Find Scholarships That Fit You
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover global opportunities tailored to your profile and
              ambitions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/scholarshiplist"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Explore Scholarships
              </Link>
              <Link
                to="/scholarshiplist"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Take Compatibility Test
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400/EEE/31316A?text=Education+Illustration"
              alt="Education Illustration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What ScholarLink Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="material-symbols-outlined text-blue-700 text-3xl">
                quiz
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
              Compatibility Test
            </h3>
            <p className="text-gray-600 text-center">
              Find scholarships that match your qualifications and interests.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="material-symbols-outlined text-blue-700 text-3xl">
                dashboard
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
              Personalized Dashboard
            </h3>
            <p className="text-gray-600 text-center">
              Track your applications and get recommendations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="material-symbols-outlined text-blue-700 text-3xl">
                bookmark
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
              Bookmarking
            </h3>
            <p className="text-gray-600 text-center">
              Save scholarships for later and never miss deadlines.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="material-symbols-outlined text-blue-700 text-3xl">
                notifications
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
              Notifications
            </h3>
            <p className="text-gray-600 text-center">
              Get timely alerts for deadlines and application status.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Scholarships */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
            Popular Scholarships
          </h2>

          <div className="flex overflow-x-auto pb-6 gap-6 hide-scrollbar">
            {/* Scholarship Preview Cards */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="h-3 bg-blue-500"></div>
                <div className="p-6">
                  <div className="flex gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Singapore
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Master's
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    NUS Research Scholarship
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Full tuition + monthly stipend
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600">
                      Deadline: Jan 31, 2025
                    </span>
                    <Link
                      to="/scholarshiplist"
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/scholarshiplist"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              View All Scholarships
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials - Optional Simple Version */}
      <div className="py-16 px-4 container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-16 text-gray-800">
          What Our Users Say
        </h2>
        <blockquote className="text-xl italic text-gray-700 mb-6">
          "ScholarLink helped me find and apply for a scholarship that I
          wouldn't have discovered otherwise. Now I'm studying abroad!"
        </blockquote>
        <div className="inline-flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
          <div className="text-left">
            <p className="font-semibold text-gray-800">Sarah Johnson</p>
            <p className="text-gray-600 text-sm">Master's Student, Singapore</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
