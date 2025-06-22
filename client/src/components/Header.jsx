import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaGraduationCap } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);

    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUserMenuOpen(false);
  };

  // Helper function to determine if a link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left - Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaGraduationCap className="text-3xl text-blue-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ScholarLink
              </span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                ${
                  isActive("/")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              Home
            </Link>
            <Link
              to="/scholarshiplist"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                ${
                  isActive("/scholarshiplist")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              Scholarships
            </Link>
            <Link
              to="/bookmark"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                ${
                  isActive("/bookmark")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              Bookmarks
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                  ${
                    isActive("/dashboard")
                      ? "border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                  }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                ${
                  isActive("/about")
                    ? "border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              About Us
            </Link>
          </div>

          {/* Right - Authentication Section */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center gap-2 border border-gray-200 py-1.5 px-3 rounded-full hover:bg-gray-50">
                      <FaUserCircle className="text-blue-600 text-xl" />
                      <span className="text-sm font-medium text-gray-700">
                        Account
                      </span>
                    </div>
                  </button>
                </div>

                {/* Profile dropdown */}
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to="/dashboard"
                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <MdOutlineDashboard className="mr-2 text-blue-600 text-lg" />
                        Dashboard
                      </Link>
                      <Link
                        to="/mainprofile"
                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FaUserCircle className="mr-2 text-blue-600 text-lg" />
                        My Profile
                      </Link>
                      <Link
                        to="/bookmark"
                        className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <IoBookmarkOutline className="mr-2 text-blue-600 text-lg" />
                        My Bookmarks
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <span className="material-symbols-outlined mr-2 text-blue-600">
                          logout
                        </span>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="pb-3 space-y-1 border-t border-gray-100 bg-white shadow-lg">
          <Link
            to="/"
            className={`block py-2 px-4 text-base font-medium 
              ${
                isActive("/")
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/scholarshiplist"
            className={`block py-2 px-4 text-base font-medium 
              ${
                isActive("/scholarshiplist")
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Scholarships
          </Link>
          <Link
            to="/bookmark"
            className={`block py-2 px-4 text-base font-medium 
              ${
                isActive("/bookmark")
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Bookmarks
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className={`block py-2 px-4 text-base font-medium 
                ${
                  isActive("/dashboard")
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className={`block py-2 px-4 text-base font-medium 
              ${
                isActive("/about")
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>

          {/* Mobile auth buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-1">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center py-2 px-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                >
                  <Link to='/logout'>
                    <span className="material-symbols-outlined mr-2 text-blue-600">
                      logout
                    </span>
                  </Link>
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center mx-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
