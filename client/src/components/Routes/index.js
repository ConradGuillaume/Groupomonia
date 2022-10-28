import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import ProfilPublic from "../../pages/ProfilPublic";
import Navbar from "../Navbar";
import PageError from "../../pages/PageError";

/* Gestion de toutes les Routes du site */
const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Public/:Id" element={<ProfilPublic />} />
        <Route path="*" element={<Profil />} />
        <Route path="/404" element={<PageError />} />
      </Routes>
    </Router>
  );
};

export default index;
