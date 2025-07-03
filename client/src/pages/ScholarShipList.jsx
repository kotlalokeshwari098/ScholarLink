import React, { useEffect, useState, createContext } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import axios from "axios";
import axiosInstance from "../api/axiosConfig";

export const myBookmark = createContext();

function ScholarShipList() {
  const [dataInitial, setDataInitial] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [bookMarkList, setBookMarkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/scholarships");
        console.log(response);
        setDataInitial(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function submitData(e) {
    e.preventDefault();
    setIsFiltered(true);
    setLoading(true); // Set loading to true when submitting filters

    const formData = new FormData(e.currentTarget);
    const country = formData.get("country");
    const universityName = formData.get("universityName");
    const type = formData.get("type");

    try {
      const result = await axiosInstance.get(
        `/scholarshipfilter?country=${country}&university=${universityName}&degree=${type}`
      );
      setFilteredData(result.data);
    } catch (err) {
      console.log(err.status);
      console.log(err.message);
    } finally {
      setLoading(false); // Set loading to false when results are received
    }
  }

  // Placeholder for bookmark toggle logic
  function toggleBookMark(id) {
    // Implement your bookmark logic here
    setBookMarkList((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      {/* Filter Form */}
      <form
        className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl shadow mb-8"
        onSubmit={submitData}
      >
        <select
          name="country"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Country</option>
          <option value="Singapore">Singapore</option>
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
          <option value="Australia">Australia</option>
        </select>
        <select
          name="universityName"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select University</option>
          <option value="National University of Singapore (NUS)">
            National University of Singapore
          </option>
          <option value="Nanyang Technological University (NTU)">
            Nanyang Technological University
          </option>
          <option value="University of Toronto">University of Toronto</option>
          <option value="University of British Columbia (UBC)">
            University of British Columbia
          </option>
          <option value="Technical University of Munich (TUM)">
            Technical University of Munich
          </option>
          <option value="RWTH Aachen University">RWTH Aachen University</option>
          <option value="Harvard University">Harvard University</option>
          <option value="Stanford University">Stanford University</option>
          <option value="University of Melbourne">
            University of Melbourne
          </option>
          <option value="University of Sydney">University of Sydney</option>
        </select>
        <select
          name="type"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Graduate Programs</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Master's/PhD">Master's/PhD</option>
          <option value="Bachelor's/Master's">Bachelor's/Master's</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setIsFiltered(false)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </form>

      {/* Add message when filtering is in progress */}
      {isFiltered && !loading && filteredData.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center mb-6">
          <span className="material-symbols-outlined text-yellow-500 text-4xl mb-2">
            search_off
          </span>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Scholarships Found
          </h3>
          <p className="text-gray-600">
            No scholarships match your filter criteria. Try different options.
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-2 bg-gray-300 w-full"></div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-blue-100 rounded-full w-20"></div>
                  <div className="h-6 bg-green-100 rounded-full w-16"></div>
                </div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(isFiltered ? filteredData : dataInitial).map((item, index) => (
            <ScholarshipCard
              key={item.id || index}
              id={item.id}
              universityName={item.university_name}
              countryName={item.country_name}
              amount={item.amount}
              deadline={item.deadline}
              scholarshipName={item.scholarship_name}
              degreeLevel={item.degree}
              onClick={() => toggleBookMark(item.id)}
              eligible={item.eligible}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScholarShipList;
