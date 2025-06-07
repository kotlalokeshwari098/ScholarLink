import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

const CompatibilityCheck = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          // If user is not logged in, redirect to login
          navigate("/login", { state: { from: "compatibility" } });
          return;
        }

        // Get user profile data to check if it's complete
        const response = await axiosInstance.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = response.data;

        // Check if critical profile fields are filled
        const isProfileComplete = checkIfProfileComplete(profileData);

        if (isProfileComplete) {
          // If profile is complete, redirect to compatibility test
          navigate("/compatibility-test");
        } else {
          // If profile is incomplete, redirect to profile page with a notification
          navigate("/profile", {
            state: {
              fromCompatibility: true,
              message:
                "Please complete your profile before taking the compatibility test",
            },
          });
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        navigate("/profile", {
          state: {
            fromCompatibility: true,
            message:
              "Please complete your profile before taking the compatibility test",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    checkProfileCompletion();
  }, [navigate]);

  // Function to check if critical profile fields are filled
  const checkIfProfileComplete = (profile) => {
    // List of required fields from the user_profile table
    const requiredFields = [
      "age",
      "gender",
      "category",
      "current_education_level",
      "course_name",
      "institution_name",
      "cgpa",
      "education_stream",
      "year_of_study",
      "state",
      "district",
    ];

    // Check if all required fields have values
    return requiredFields.every(
      (field) =>
        profile[field] !== undefined &&
        profile[field] !== null &&
        profile[field] !== ""
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your profile...</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityCheck;
