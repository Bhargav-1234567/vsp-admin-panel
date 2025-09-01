// src/components/Layout/Topbar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { toggleSidebar } from "../../store/sidebarSlice";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
          >
            <FiMenu size={20} />
          </button>

          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin!</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 relative">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200">
              <FiUser size={20} />
              <span className="hidden md:block text-sm font-medium">Admin</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiUser className="mr-3" size={16} />
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3" size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
