import React from "react";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosConfig";

function AboutUs() {
  const [data, setData] = useState();
  axiosInstance
    .get("/")
    .then((res) => console.log(res.data))
    .catch((err) => console.error("Error:", err));

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            About ScholarLink
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting ambitious students with global scholarship opportunities.
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="bg-blue-100 rounded-xl p-6 flex items-center justify-center">
                <img
                  src="https://placehold.co/400x400/EEE/31316A?text=ScholarLink"
                  alt="ScholarLink Logo"
                  className="rounded-lg w-full"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                ScholarLink was founded with a simple mission: to make the
                scholarship search process easier and more accessible for
                students around the world. We believe that financial constraints
                should never prevent talented individuals from pursuing higher
                education.
              </p>
              <p className="text-gray-600">
                Our platform connects students with scholarship opportunities
                that match their qualifications and interests, helping them find
                financial support for their educational journey.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="material-symbols-outlined text-blue-600 text-3xl">
                  search
                </span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Simplify Discovery
              </h3>
              <p className="text-gray-600 text-center">
                Creating a centralized platform where students can easily find
                relevant scholarships.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="material-symbols-outlined text-blue-600 text-3xl">
                  diversity_3
                </span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Promote Access
              </h3>
              <p className="text-gray-600 text-center">
                Ensuring education is accessible to students from all
                backgrounds and circumstances.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="material-symbols-outlined text-blue-600 text-3xl">
                  school
                </span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">
                Support Success
              </h3>
              <p className="text-gray-600 text-center">
                Providing tools and resources that help students succeed in
                their applications.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Get In Touch
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="material-symbols-outlined text-blue-600 mr-3">
                    email
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">contact@scholarlink.example</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="material-symbols-outlined text-blue-600 mr-3">
                    location_on
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800">Location</h4>
                    <p className="text-gray-600">
                      Virtual Office - We operate remotely to serve students
                      worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="material-symbols-outlined text-blue-600 mr-3">
                    schedule
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800">Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9 AM - 5 PM (PST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                Send Us a Message
              </h3>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
