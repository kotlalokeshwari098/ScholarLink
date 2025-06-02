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

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/scholarships");
        setDataInitial(response.data.rows);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  async function submitData(e) {
    e.preventDefault();
    setIsFiltered(true);

    const formData = new FormData(e.currentTarget);
    const country = formData.get("country");
    const universityName = formData.get("universityName");
    const type = formData.get("type");

    try {
      const result = await axios.get(
        `http://localhost:5656/scholarshipfilter?country=${country}&university=${universityName}&degree=${type}`
      );
      setFilteredData(result.data.rows);
    } catch (err) {
      console.log(err.status);
      console.log(err.message);
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

      {/* Scholarship Cards Grid - MODIFIED to improve cards per row */}
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
    </div>
  );
}

export default ScholarShipList;
