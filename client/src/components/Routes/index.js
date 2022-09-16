import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default index;
