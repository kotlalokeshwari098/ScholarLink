import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { ProfileDataContext } from "../context/ProfileContext";
import { UserDataContext } from "../context/UserContext";

function ScholarShipCompatability() {
  const {profile,setProfile}=useContext(ProfileDataContext)
  const {user,setUser}=useContext(ProfileDataContext)
  const [loading, setLoading] = useState(true);
  const [scholarshipData, setScholarshipData] = useState(null);
  const [compatibilityScore, setCompatibilityScore] = useState(null);
  const [compatibilityDetails, setCompatibilityDetails] = useState([]);
  const { id, name } = useParams();

  console.log("Scholarship compatable",profile)
  console.log("Scholarship compatable",user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const scholarshipResponse = await axiosInstance.get(
            `/scholarshiplist/${id}`
          );
          console.log("Scholarship Response:", scholarshipResponse.data.rows[0]);
          setScholarshipData(scholarshipResponse.data.rows[0]);
         
        }

          // Calculate compatibility if we have both scholarship and profile data
          if (name && profile) {
            calculateCompatibility(
              scholarshipResponse.data.rows[0],
              profile
            );
          }
        }
       catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to calculate compatibility between user profile and scholarship
  const calculateCompatibility = (scholarship, profile) => {
    // This is a simplified compatibility calculation
    // In a real application, this would be more sophisticated

    let score = 0;
    let totalFactors = 0;
    let details = [];

    // Education level compatibility
    if (scholarship.degree && profile.current_education_level) {
      totalFactors++;
      const degreeMatch = checkDegreeMatch(
        scholarship.degree,
        profile.current_education_level
      );
      if (degreeMatch) {
        score++;
        details.push({
          factor: "Education Level",
          status: "match",
          message: "Your education level matches the scholarship requirement.",
        });
      } else {
        details.push({
          factor: "Education Level",
          status: "mismatch",
          message:
            "Your education level may not match the scholarship requirement.",
        });
      }
    }

    // CGPA compatibility
    if (scholarship.min_cgpa && profile.cgpa) {
      totalFactors++;
      if (parseFloat(profile.cgpa) >= parseFloat(scholarship.min_cgpa)) {
        score++;
        details.push({
          factor: "Academic Performance",
          status: "match",
          message: "Your CGPA meets the minimum requirement.",
        });
      } else {
        details.push({
          factor: "Academic Performance",
          status: "mismatch",
          message: "Your CGPA is below the minimum requirement.",
        });
      }
    }

    // Country or region compatibility
    if (scholarship.eligible_countries && profile.state) {
      totalFactors++;
      if (scholarship.eligible_countries.includes(profile.state)) {
        score++;
        details.push({
          factor: "Location",
          status: "match",
          message: "You are in an eligible region.",
        });
      } else {
        details.push({
          factor: "Location",
          status: "mismatch",
          message: "You may not be in an eligible region.",
        });
      }
    }

    // Calculate final percentage
    const finalScore =
      totalFactors > 0 ? Math.round((score / totalFactors) * 100) : 50;
    setCompatibilityScore(finalScore);
    setCompatibilityDetails(details);
  };

  // Helper function to check if education levels match
  const checkDegreeMatch = (scholarshipDegree, userDegree) => {
    // Simplified check - in a real app this would be more comprehensive
    const scholarshipLevel = scholarshipDegree.toLowerCase();
    const userLevel = userDegree.toLowerCase();

    if (
      scholarshipLevel.includes("master") &&
      userLevel.includes("undergraduate")
    ) {
      return false;
    }
    if (
      scholarshipLevel.includes("phd") &&
      !userLevel.includes("postgraduate")
    ) {
      return false;
    }
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your compatibility...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-2 bg-blue-600"></div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Scholarship Compatibility Test
            </h1>

            {scholarshipData ? (
              <div className="mb-8">
                <p className="text-gray-600 mb-2">
                  Analyzing your compatibility with:
                </p>
                <h2 className="text-xl font-semibold text-gray-800">
                  {scholarshipData.scholarship_name}
                </h2>
                <p className="text-gray-600">
                  {scholarshipData.university_name},{" "}
                  {scholarshipData.country_name}
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <p className="text-gray-600">
                  Analyzing your general scholarship compatibility
                </p>
              </div>
            )}

            {compatibilityScore !== null && (
              <div className="mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={
                          compatibilityScore > 70
                            ? "#4ade80"
                            : compatibilityScore > 40
                            ? "#facc15"
                            : "#ef4444"
                        }
                        strokeWidth="3"
                        strokeDasharray={`${compatibilityScore}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {compatibilityScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    {compatibilityScore > 70
                      ? "Great Match!"
                      : compatibilityScore > 40
                      ? "Potential Match"
                      : "Limited Compatibility"}
                  </h3>
                  <p className="text-gray-600">
                    {compatibilityScore > 70
                      ? "You have a strong chance of qualifying for this scholarship."
                      : compatibilityScore > 40
                      ? "You meet some criteria but may need to strengthen your application."
                      : "You may want to explore other scholarships that better match your profile."}
                  </p>
                </div>
              </div>
            )}

            {compatibilityDetails.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium text-gray-700">
                    Compatibility Breakdown
                  </h3>
                </div>
                <div className="divide-y">
                  {compatibilityDetails.map((detail, index) => (
                    <div key={index} className="px-4 py-3 flex items-start">
                      <span
                        className={`material-symbols-outlined mr-3 ${
                          detail.status === "match"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {detail.status === "match" ? "check_circle" : "cancel"}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">
                          {detail.factor}
                        </p>
                        <p className="text-sm text-gray-600">
                          {detail.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mr-4"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
              {scholarshipData && scholarshipData.link && (
                <a
                  href={scholarshipData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Apply Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarShipCompatability;
