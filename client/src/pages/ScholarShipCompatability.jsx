import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { ProfileDataContext } from "../context/ProfileContext";
import { UserDataContext } from "../context/UserContext";

function ScholarShipCompatability() {
  const {profile,setProfile}=useContext(ProfileDataContext)
  const {user,setUser}=useContext(UserDataContext)
  const [loading, setLoading] = useState(true);
  const [scholarshipData, setScholarshipData] = useState(null);
  const [compatibilityScore, setCompatibilityScore] = useState(null);
  const [compatibilityDetails, setCompatibilityDetails] = useState([]);
  const [categoryScores, setCategoryScores] = useState({});
  const { id, name } = useParams();

  console.log("Scholarship profile",profile)
  console.log("Scholarship user",user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const scholarshipResponse = await axiosInstance.get(
            `/scholarshiplist/${id}`
          );
          console.log("Scholarship Response:", scholarshipResponse.data);
          setScholarshipData(scholarshipResponse.data);

          // Always calculate compatibility once we have scholarship data
          // This ensures we display results even if some fields are missing
          if (profile) {
            calculateCompatibility(scholarshipResponse.data, profile);
          } else {
            console.error("Profile data is missing");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, profile]);

  // Function to calculate compatibility between user profile and scholarship
  const calculateCompatibility = (scholarship, profile) => {
    console.log("Calculating compatibility with:", scholarship);
    console.log("User profile:", profile);

    // Initialize scores for each category
    let basicEligibilityScore = { score: 0, total: 0, details: [] };
    let academicRequirementsScore = { score: 0, total: 0, details: [] };
    let extraStrengthScore = { score: 0, total: 0, details: [] };
    let documentVerificationScore = { score: 0, total: 0, details: [] };
    
    // Ensure we have minimal data to proceed
    if (!scholarship || !profile) {
      console.error("Missing data for compatibility calculation");
      return;
    }
    
    // Normalize and clean profile data to handle common issues
    const normalizedProfile = normalizeProfileData(profile);
    console.log("Normalized profile data:", normalizedProfile);
    
    // Extract scholarship fields, with careful property checking
    const scholarshipFields = {
      eligibleCountries: scholarship.eligible_countries || scholarship.country_name || "",
      degree: scholarship.degree || scholarship.qualification_type || "",
      fieldOfStudy: scholarship.field_of_study || scholarship.eligible_programmes || "",
      minCGPA: parseFloat(scholarship.min_cgpa) || 0,
      yearOfStudy: parseInt(scholarship.year_of_study) || 0,
      researchRequired: scholarship.research_required === true,
      examRequired: scholarship.entrance_exam_required === true,
      portfolioRequired: scholarship.portfolio_required === true,
      documentsRequired: Array.isArray(scholarship.required_documents) ? 
                        scholarship.required_documents : 
                        []
    };
    
    // Extract profile fields, with careful property checking
    const profileFields = {
      state: normalizedProfile.state || "",
      district: normalizedProfile.district || "",
      currentEducationLevel: normalizedProfile.current_education_level || "",
      courseOrStream: normalizedProfile.course_name || normalizedProfile.education_stream || "",
      cgpa: parseFloat(normalizedProfile.cgpa) || 0,
      yearOfStudy: parseInt(normalizedProfile.year_of_study) || 0,
      hasResearchExperience: normalizedProfile.research_experience === true,
      hasEntranceExamScores: Array.isArray(normalizedProfile.entrance_exam_scores) && 
                           normalizedProfile.entrance_exam_scores.length > 0,
      hasPortfolio: normalizedProfile.portfolio || 
                   (Array.isArray(normalizedProfile.portfolio) && normalizedProfile.portfolio.length > 0),
      hasRequiredDocuments: normalizedProfile.required_documents_uploaded === true,
      isIDVerified: normalizedProfile.id_verified === true
    };
    
    // 1. Basic Eligibility Check
    // Check for eligible countries/regions with improved region matching
    if (scholarshipFields.eligibleCountries) {
      basicEligibilityScore.total++;
      const isAllInternational = scholarshipFields.eligibleCountries.toLowerCase().includes("all international") || 
                               scholarshipFields.eligibleCountries.toLowerCase().includes("international");
      
      // Check both state and district for a match
      const regionMatch = isAllInternational || 
                        checkRegionMatch(
                          scholarshipFields.eligibleCountries, 
                          profileFields.state, 
                          profileFields.district
                        );
      
      if (regionMatch) {
        basicEligibilityScore.score++;
        basicEligibilityScore.details.push({
          factor: "Nationality/Region",
          status: "match",
          message: "You are in an eligible region."
        });
      } else {
        basicEligibilityScore.details.push({
          factor: "Nationality/Region",
          status: "mismatch",
          message: "You may not be in an eligible region."
        });
      }
    }
    
    // Qualification type check with improved education level matching
    if (scholarshipFields.degree && profileFields.currentEducationLevel) {
      basicEligibilityScore.total++;
      const qualificationMatch = checkQualificationMatch(
        scholarshipFields.degree,
        profileFields.currentEducationLevel
      );
      
      if (qualificationMatch) {
        basicEligibilityScore.score++;
        basicEligibilityScore.details.push({
          factor: "Qualification",
          status: "match",
          message: "Your qualification matches the scholarship requirements."
        });
      } else {
        basicEligibilityScore.details.push({
          factor: "Qualification",
          status: "mismatch",
          message: "Your qualification may not match the scholarship requirements."
        });
      }
    }
    
    // Program of study check with improved field matching
    if (scholarshipFields.fieldOfStudy && profileFields.courseOrStream) {
      basicEligibilityScore.total++;
      const programMatch = checkProgramMatch(
        scholarshipFields.fieldOfStudy, 
        profileFields.courseOrStream
      );
      
      if (programMatch) {
        basicEligibilityScore.score++;
        basicEligibilityScore.details.push({
          factor: "Program",
          status: "match",
          message: "Your program of study matches the scholarship requirements."
        });
      } else {
        basicEligibilityScore.details.push({
          factor: "Program",
          status: "mismatch",
          message: "Your program of study may not match the scholarship requirements."
        });
      }
    }
    
    // 2. Academic Requirements
    // CGPA/GPA check
    if (scholarshipFields.minCGPA && profileFields.cgpa) {
      academicRequirementsScore.total++;
      if (profileFields.cgpa >= scholarshipFields.minCGPA) {
        academicRequirementsScore.score++;
        academicRequirementsScore.details.push({
          factor: "GPA/CGPA",
          status: "match",
          message: `Your CGPA (${profileFields.cgpa}) meets the minimum requirement (${scholarshipFields.minCGPA}).`
        });
      } else {
        academicRequirementsScore.details.push({
          factor: "GPA/CGPA",
          status: "mismatch",
          message: `Your CGPA (${profileFields.cgpa}) is below the minimum requirement (${scholarshipFields.minCGPA}).`
        });
      }
    }
    
    // Year of study check with validation for unrealistic values
    if (scholarshipFields.yearOfStudy && profileFields.yearOfStudy) {
      const validYearOfStudy = profileFields.yearOfStudy > 0 && profileFields.yearOfStudy <= 7;
      
      if (validYearOfStudy) {
        academicRequirementsScore.total++;
        if (profileFields.yearOfStudy >= scholarshipFields.yearOfStudy) {
          academicRequirementsScore.score++;
          academicRequirementsScore.details.push({
            factor: "Year of Study",
            status: "match",
            message: "Your year of study meets the requirements."
          });
        } else {
          academicRequirementsScore.details.push({
            factor: "Year of Study",
            status: "mismatch",
            message: `You need to be in year ${scholarshipFields.yearOfStudy} or above.`
          });
        }
      } else {
        academicRequirementsScore.details.push({
          factor: "Year of Study",
          status: "warning",
          message: "Your year of study information appears to be incorrect."
        });
      }
    }
    
    // 3. Extra Strength Indicators
    // Research experience
    if (scholarshipFields.researchRequired !== undefined) {
      extraStrengthScore.total++;
      if (profileFields.hasResearchExperience) {
        extraStrengthScore.score++;
        extraStrengthScore.details.push({
          factor: "Research Experience",
          status: "match",
          message: "Your research experience is a plus for this scholarship."
        });
      } else {
        extraStrengthScore.details.push({
          factor: scholarshipFields.researchRequired ? 
                "Research Experience (Required)" : 
                "Research Experience",
          status: scholarshipFields.researchRequired ? "mismatch" : "neutral",
          message: scholarshipFields.researchRequired ?
                "Research experience is required for this scholarship." :
                "Research experience would strengthen your application."
        });
      }
    }
    
    // Standardized tests
    if (scholarshipFields.examRequired !== undefined) {
      extraStrengthScore.total++;
      if (profileFields.hasEntranceExamScores) {
        extraStrengthScore.score++;
        extraStrengthScore.details.push({
          factor: "Standardized Tests",
          status: "match",
          message: "You have submitted standardized test scores."
        });
      } else {
        extraStrengthScore.details.push({
          factor: scholarshipFields.examRequired ? 
                "Standardized Tests (Required)" : 
                "Standardized Tests",
          status: scholarshipFields.examRequired ? "mismatch" : "neutral",
          message: scholarshipFields.examRequired ?
                "Standardized test scores are required for this scholarship." :
                "Submitting test scores might strengthen your application."
        });
      }
    }
    
    // Portfolio/publications
    if (scholarshipFields.portfolioRequired !== undefined) {
      extraStrengthScore.total++;
      if (profileFields.hasPortfolio) {
        extraStrengthScore.score++;
        extraStrengthScore.details.push({
          factor: "Portfolio/Publications",
          status: "match",
          message: "Your portfolio items strengthen your application."
        });
      } else {
        extraStrengthScore.details.push({
          factor: scholarshipFields.portfolioRequired ? 
                "Portfolio/Publications (Required)" : 
                "Portfolio/Publications",
          status: scholarshipFields.portfolioRequired ? "mismatch" : "neutral",
          message: scholarshipFields.portfolioRequired ?
                "A portfolio is required for this scholarship." :
                "Adding portfolio items might strengthen your application."
        });
      }
    }
    
    // 4. Document & Verification Status
    // Required documents check
    if (scholarshipFields.documentsRequired.length > 0) {
      documentVerificationScore.total++;
      if (profileFields.hasRequiredDocuments) {
        documentVerificationScore.score++;
        documentVerificationScore.details.push({
          factor: "Required Documents",
          status: "match",
          message: "You have uploaded all required documents."
        });
      } else {
        documentVerificationScore.details.push({
          factor: "Required Documents",
          status: "warning",
          message: `Missing required documents: ${scholarshipFields.documentsRequired.join(", ")}`
        });
      }
    }
    
    // ID verification
    documentVerificationScore.total++;
    if (profileFields.isIDVerified) {
      documentVerificationScore.score++;
      documentVerificationScore.details.push({
        factor: "ID Verification",
        status: "match",
        message: "Your ID is verified."
      });
    } else {
      documentVerificationScore.details.push({
        factor: "ID Verification",
        status: "warning",
        message: "Your ID needs to be verified."
      });
    }
    
    // Calculate category scores (as percentages)
    const basicEligibilityPercentage = basicEligibilityScore.total > 0 
      ? Math.round((basicEligibilityScore.score / basicEligibilityScore.total) * 100) 
      : 0;
    
    const academicRequirementsPercentage = academicRequirementsScore.total > 0 
      ? Math.round((academicRequirementsScore.score / academicRequirementsScore.total) * 100) 
      : 0;
    
    const extraStrengthPercentage = extraStrengthScore.total > 0 
      ? Math.round((extraStrengthScore.score / extraStrengthScore.total) * 100) 
      : 0;
    
    const documentVerificationPercentage = documentVerificationScore.total > 0 
      ? Math.round((documentVerificationScore.score / documentVerificationScore.total) * 100) 
      : 0;
    
    // Save category scores for display
    setCategoryScores({
      basicEligibility: basicEligibilityPercentage,
      academicRequirements: academicRequirementsPercentage,
      extraStrength: extraStrengthPercentage,
      documentVerification: documentVerificationPercentage
    });
    
    // Weighted calculation for final score - only if we have data to calculate
    const totalFactors = basicEligibilityScore.total + academicRequirementsScore.total + 
                        extraStrengthScore.total + documentVerificationScore.total;
                        
    let finalScore = 0;
    
    if (totalFactors > 0) {
      // Basic eligibility has highest weight, followed by academic, extra strength, and document verification
      const weights = {
        basicEligibility: 0.4,
        academicRequirements: 0.3,
        extraStrength: 0.2,
        documentVerification: 0.1
      };
      
      finalScore = Math.round(
        (basicEligibilityPercentage * weights.basicEligibility) +
        (academicRequirementsPercentage * weights.academicRequirements) +
        (extraStrengthPercentage * weights.extraStrength) +
        (documentVerificationPercentage * weights.documentVerification)
      );
    }
    
    console.log("Final compatibility score:", finalScore);
    console.log("Category scores:", {
      basicEligibility: basicEligibilityPercentage,
      academicRequirements: academicRequirementsPercentage,
      extraStrength: extraStrengthPercentage,
      documentVerification: documentVerificationPercentage
    });
    
    // Combine all details for display
    const allDetails = [
      ...basicEligibilityScore.details,
      ...academicRequirementsScore.details,
      ...extraStrengthScore.details,
      ...documentVerificationScore.details
    ];
    
    // Set the results
    setCompatibilityScore(finalScore);
    setCompatibilityDetails(allDetails);
  };

  // Helper function to normalize and clean profile data
  const normalizeProfileData = (profile) => {
    const normalized = { ...profile };
    
    // Fix education level abbreviations
    if (normalized.current_education_level) {
      const level = normalized.current_education_level.toLowerCase();
      if (level === "under" || level === "ug") {
        normalized.current_education_level = "undergraduate";
      } else if (level === "post" || level === "pg") {
        normalized.current_education_level = "postgraduate";
      }
    }
    
    // Fix course name abbreviations
    if (normalized.course_name) {
      const course = normalized.course_name.toLowerCase();
      if (course === "cs") {
        normalized.course_name = "computer science";
      } else if (course === "it") {
        normalized.course_name = "information technology";
      } else if (course === "ece") {
        normalized.course_name = "electronics and communication engineering";
      }
    }
    
    // Fix education stream abbreviations
    if (normalized.education_stream) {
      const stream = normalized.education_stream.toLowerCase();
      if (stream === "br" || stream === "b.tech") {
        normalized.education_stream = "bachelor of technology";
      } else if (stream === "bsc") {
        normalized.education_stream = "bachelor of science";
      }
    }
    
    // Fix state/district confusion - sometimes they're swapped
    if (normalized.state && normalized.state.toLowerCase() === "hyd") {
      normalized.state = "Telangana";
      // Only override district if it doesn't look like a proper district name
      if (!normalized.district || normalized.district.toLowerCase() === "telangana") {
        normalized.district = "Hyderabad";
      }
    }
    
    // Fix year of study if it's unrealistic
    if (normalized.year_of_study) {
      const year = parseInt(normalized.year_of_study);
      if (year > 7) {
        // Use a more realistic value based on education level
        normalized.year_of_study = normalized.current_education_level?.includes("post") ? "2" : "3";
      }
    }
    
    return normalized;
  };

  // Helper function to check if a region matches eligibility criteria
  const checkRegionMatch = (eligibleRegions, state, district) => {
    if (!eligibleRegions) return false;
    
    const eligibleLower = eligibleRegions.toLowerCase();
    const stateLower = state?.toLowerCase() || "";
    const districtLower = district?.toLowerCase() || "";
    
    // Check if eligible regions contains the state or district
    return eligibleLower.includes(stateLower) || 
           eligibleLower.includes(districtLower) ||
           eligibleLower.includes("india") || 
           eligibleLower.includes("all");
  };

  // Helper functions for matching logic
  const checkQualificationMatch = (scholarshipQualification, userQualification) => {
    if (!scholarshipQualification || !userQualification) {
      return false; // No match if either is missing
    }
    
    // Convert to lowercase for case-insensitive comparison
    const scholarshipQual = scholarshipQualification.toLowerCase();
    const userQual = userQualification.toLowerCase();
    
    // Map common abbreviations and alternatives
    const undergraduateTerms = ["undergraduate", "under", "ug", "bachelor", "b.tech", "b.e", "b.sc"];
    const postgraduateTerms = ["postgraduate", "post", "pg", "master", "m.tech", "m.e", "m.sc", "mba"];
    const phdTerms = ["phd", "doctorate", "doctoral", "research"];
    
    const isUserUndergrad = undergraduateTerms.some(term => userQual.includes(term));
    const isUserPostgrad = postgraduateTerms.some(term => userQual.includes(term));
    const isUserPhd = phdTerms.some(term => userQual.includes(term));
    
    const isScholarshipUndergrad = undergraduateTerms.some(term => scholarshipQual.includes(term));
    const isScholarshipPostgrad = postgraduateTerms.some(term => scholarshipQual.includes(term));
    const isScholarshipPhd = phdTerms.some(term => scholarshipQual.includes(term));
    
    // PhD requires at least postgrad
    if (isScholarshipPhd && !isUserPostgrad && !isUserPhd) {
      return false;
    }
    
    // Masters requires at least undergrad
    if (isScholarshipPostgrad && !isUserUndergrad && !isUserPostgrad && !isUserPhd) {
      return false;
    }
    
    // If scholarship is for undergrad, user should be undergrad
    if (isScholarshipUndergrad && !isUserUndergrad) {
      return false;
    }
    
    return true;
  };

  const checkProgramMatch = (scholarshipPrograms, userProgram) => {
    if (!scholarshipPrograms || !userProgram) {
      return false; // No match if either is missing
    }
    
    // Convert to lowercase for case-insensitive comparison
    const scholarshipProgsLower = scholarshipPrograms.toLowerCase();
    const userProgLower = userProgram.toLowerCase();
    
    // Map common abbreviations to full terms
    const programMappings = {
      "cs": ["computer science", "computing", "software"],
      "it": ["information technology", "software", "computing"],
      "ece": ["electronics", "communication"],
      "eee": ["electrical", "electronics"],
      "me": ["mechanical engineering", "mechanical"],
      "ce": ["civil engineering", "civil"],
      "br": ["bachelor", "engineering", "technology"],
    };
    
    // Direct match
    if (scholarshipProgsLower.includes(userProgLower)) {
      return true;
    }
    
    // Check for abbreviated matches
    for (const [abbr, fullTerms] of Object.entries(programMappings)) {
      if (userProgLower === abbr) {
        return fullTerms.some(term => scholarshipProgsLower.includes(term));
      }
    }
    
    // Check for any overlap in fields
    const scholarshipFields = scholarshipProgsLower.split(/[\s,;|]/);
    const userFields = userProgLower.split(/[\s,;|]/);
    
    return scholarshipFields.some(field => 
      userFields.some(userField => userField.length > 1 && field.includes(userField))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-2 bg-blue-300"></div>
            <div className="p-8">
              <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
              
              <div className="mb-8">
                <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-72 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-56"></div>
              </div>
              
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
                      stroke="#e6e6e6"
                      strokeWidth="3"
                      strokeDasharray="25, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <div className="h-6 bg-gray-300 rounded w-40 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-72 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: `${30 + i * 15}%` }}></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-20 mt-1"></div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <div className="h-5 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="px-4 py-3 flex items-start">
                      <div className="h-6 w-6 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <div className="h-5 bg-gray-300 rounded w-36 mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-56"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <div className="h-10 bg-blue-200 rounded w-24 mr-4"></div>
                <div className="h-10 bg-green-200 rounded w-24"></div>
              </div>
            </div>
          </div>
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
              Scholarship Compatibility Check
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

            {/* Force display of compatibility section only if we have data */}
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

                {/* Category breakdown - ensure default values if categoryScores is empty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-700 mb-2">Basic Eligibility</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${categoryScores.basicEligibility || 50}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{categoryScores.basicEligibility || 50}% Match</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-700 mb-2">Academic Requirements</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${categoryScores.academicRequirements || 0}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{categoryScores.academicRequirements || 0}% Match</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-700 mb-2">Extra Strengths</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${categoryScores.extraStrength || 0}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{categoryScores.extraStrength || 0}% Match</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-700 mb-2">Document Verification</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${categoryScores.documentVerification || 0}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{categoryScores.documentVerification || 0}% Match</p>
                  </div>
                </div>
              </div>
            )}

            {/* Show details only if we have them */}
            {compatibilityDetails.length > 0 && (
              <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h3 className="font-medium text-gray-700">
                    Compatibility Breakdown
                  </h3>
                </div>
                <div className="divide-y">
                  {compatibilityDetails.length > 0 ? (
                    compatibilityDetails.map((detail, index) => (
                      <div key={index} className="px-4 py-3 flex items-start">
                        <span
                          className={`material-symbols-outlined mr-3 ${
                            detail.status === "match"
                              ? "text-green-500"
                              : detail.status === "mismatch"
                              ? "text-red-500"
                              : detail.status === "warning"
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >
                          {detail.status === "match" 
                            ? "check_circle" 
                            : detail.status === "mismatch"
                            ? "cancel"
                            : detail.status === "warning"
                            ? "warning"
                            : "info"}
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
                    ))
                  ) : (
                    <div className="px-4 py-3 flex items-start">
                      <span className="material-symbols-outlined mr-3 text-yellow-500">info</span>
                      <div>
                        <p className="font-medium text-gray-800">Limited Data</p>
                        <p className="text-sm text-gray-600">
                          Not enough information to provide detailed compatibility analysis.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Show improvement suggestions only if needed */}
            {compatibilityDetails.filter(detail => detail.status !== "match").length > 0 && (
              <div className="border rounded-lg overflow-hidden mb-6 bg-blue-50 border-blue-200">
                <div className="bg-blue-100 px-4 py-2 border-b border-blue-200">
                  <h3 className="font-medium text-blue-800">
                    How to Improve Your Compatibility
                  </h3>
                </div>
                <div className="p-4 text-blue-700">
                  <ul className="list-disc list-inside space-y-2">
                    {compatibilityDetails
                      .filter(detail => detail.status !== "match")
                      .map((detail, index) => (
                        <li key={index} className="text-sm">
                          {detail.factor}: {detail.message}
                        </li>
                      ))}
                  </ul>
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
