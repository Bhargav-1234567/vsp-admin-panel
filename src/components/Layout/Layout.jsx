// src/components/Layout/Layout.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { closeSidebar, setMobileView } from "../../store/sidebarSlice";
import { useGetInitialJsonDataQuery } from "../../store/apiSlice";
import { initializeFormData } from "../../store/formJsonSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const { isOpen, isMobile } = useSelector((state) => state.sidebar);
  const [renderRoutes, setRenderRoutes] = useState(false);
  const {
    data: formJson,
    isLoading,
    isFetching,
  } = useGetInitialJsonDataQuery({}, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (formJson) {
      dispatch(initializeFormData(formJson));
      setTimeout(() => {
        setRenderRoutes(true);
      }, 200);
    }
  }, [formJson]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setMobileView(mobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen && !isMobile ? "ml-0" : "ml-0"
        }`}
      >
        <Topbar />

        {/* Page Content */}

        {formJson && renderRoutes && (
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
