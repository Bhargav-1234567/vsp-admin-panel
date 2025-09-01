// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import { useGetInitialJsonDataQuery } from "./store/apiSlice";
import { initializeFormData } from "./store/formJsonSlice";
import Images from "./pages/Images";
import Login from "./pages/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="company" element={<Company />} />
            <Route path="services" element={<Services />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="images" element={<Images />} />
          </Route>

          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
