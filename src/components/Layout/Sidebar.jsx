// src/components/Layout/Sidebar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiMessageSquare,
  FiFileText,
  FiX,
  FiMail,
  FiTrello,
  FiImage,
  FiUserCheck,
} from "react-icons/fi";
import { closeSidebar } from "../../store/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, isMobile } = useSelector((state) => state.sidebar);

  const menuItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/company", icon: FiTrello, label: "Company" },
    { path: "/services", icon: FiSettings, label: "Services" },
    { path: "/testimonials", icon: FiMessageSquare, label: "Testimonials" },
    { path: "/blogs", icon: FiFileText, label: "Blogs" },
    { path: "/contact", icon: FiMail, label: "Contact" },
    { path: "/images", icon: FiImage, label: "Images" },
    { path: "/inquiries", icon: FiUserCheck, label: "Inquiries" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-sidebar-bg transform transition-transform duration-300 ease-in-out 
    w-64 ${isOpen ? "visible" : "hidden"} md:relative`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        {isMobile && (
          <button
            onClick={() => dispatch(closeSidebar())}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-600 text-white border-r-4 border-primary-400"
                      : ""
                  }`
                }
                onClick={() => isMobile && dispatch(closeSidebar())}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <div className="ml-3">
            <p className="text-white text-sm font-medium">Admin User</p>
            <p className="text-gray-400 text-xs">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
