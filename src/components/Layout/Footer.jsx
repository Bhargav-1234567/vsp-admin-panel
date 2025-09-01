// src/components/Layout/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          © 2025 Admin Panel. All rights reserved.
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-700 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
