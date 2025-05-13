import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { AiOutlineHome } from "react-icons/ai"; // Example icon for project

function Header() {
  return (
    <div className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Project Name and Icon */}
        <div className="flex items-center space-x-2">
          <AiOutlineHome className="text-2xl" />
          <span className="text-xl font-bold">ScholarLink</span>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-gray-200 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/scholarshiplist"
            className="hover:text-gray-200 transition duration-300"
          >
            Scholarship
          </Link>
          <Link
            to="/bookmark"
            className="hover:text-gray-200 transition duration-300"
          >
            BookMark
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-200 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/sign"
            className="hover:text-gray-200 transition duration-300"
          >
            Sign
          </Link>
        </div>

        {/* Right Section: Profile Icon for Logout */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:block">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
