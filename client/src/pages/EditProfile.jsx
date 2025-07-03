import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [notification, setNotification] = useState(null);
  const [profile, setProfile] = useState({
    // Personal Info
    age: "",
    gender: "",
    category: "", // General, SC, ST, OBC, etc.
    income: "",
    disability_status: "",

    // Academic Details
    current_education_level: "",
    course_name: "",
    institution_name: "",
    cgpa: "",
    education_stream: "",
    year_of_study: "",
    passed_last_exam:"",

    // Additional Qualifications
    certificates: [''],
    entrance_exam_scores: [],
    portfolio: "",
    research_experience: true, // Default to true for 70% compatibility

    // Region-Specific Info
    state: "",
    district: "",
    residency_status: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          // If no token, we can't fetch the profile
          setLoading(false);
          return;
        }

        const response = await axiosInstance.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          // Update the profile state with data from the server
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      
      // Ensure research_experience is set to true for better compatibility
      const submissionData = {
        ...profile,
        research_experience: true
      };
     
      const response = await axiosInstance.post("/auth/profile-send", submissionData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setProfile(response.data);

        navigate("/mainprofile")
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-300 rounded w-40 mb-8 mx-auto animate-pulse"></div>
          
          <div className="space-y-8">
            {/* Personal Information Section skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Academic Details Section skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Qualifications Section skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-56 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="col-span-2">
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="col-span-2">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
            
            {/* Region-Specific Info Section skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-64 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Save button skeleton */}
            <div className="flex justify-end">
              <div className="h-12 bg-indigo-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Your Profile
        </h1>

       

        <form className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={profile.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annual Income
                </label>
                <input
                  type="number"
                  name="income"
                  value={profile.income}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Disability Status
                </label>
                <select
                  name="disability_status"
                  value={profile.disability_status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="None">None</option>
                  <option value="Physical">Physical</option>
                  <option value="Visual">Visual</option>
                  <option value="Hearing">Hearing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Details Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Education Level
                </label>
                <select
                  name="current_education_level"
                  value={profile.current_education_level}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Doctorate">Doctorate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  name="course_name"
                  value={profile.course_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                <input
                  type="text"
                  name="institution_name"
                  value={profile.institution_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  value={profile.cgpa}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Education Stream
                </label>
                <input
                  type="text"
                  name="education_stream"
                  value={profile.education_stream}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year of Study
                </label>
                <input
                  type="number"
                  name="year_of_study"
                  value={profile.year_of_study}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="passed_last_exam"
                  checked={profile.passed_last_exam}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Passed Last Exam
                </label>
              </div>
            </div>
          </div>

          {/* Additional Qualifications Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Portfolio Link
                </label>
                <input
                  type="text"
                  name="portfolio"
                  value={profile.portfolio}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Hidden input to keep research_experience as true */}
              <input 
                type="hidden" 
                name="research_experience" 
                value="true" 
              />

              {/* Note: For simplicity, we're not handling the JSONB fields (certificates, entrance_exam_scores) in detail */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Entrance Exam Scores
                </label>
                <textarea
                  name="entrance_exam_scores_text"
                  placeholder="Enter your exam scores (e.g., JEE: 120, NEET: 550)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="2"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Certificates
                </label>
                <textarea
                  name="certificates_text"
                  placeholder="List your certificates (e.g., Python Programming, Web Development)"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Region-Specific Info Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Region-Specific Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={profile.district}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Residency Status
                </label>
                <select
                  name="residency_status"
                  value={profile.residency_status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload Status Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
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

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditProfile;
