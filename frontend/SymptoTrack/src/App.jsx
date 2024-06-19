import React from "react";

import FooterComponent from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import Home from "./pages/Home/Home";

export const App = () => {
  return (
    <>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <FooterComponent />
    </>
  );
};