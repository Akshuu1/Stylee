import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";

import "./index.css";
import { NavbarDemo } from "./components/Animations/Navbar-Animated";
import BackgroundMusic from "./components/BackgroundMusic";
import LandingPage from "./components/LandingPage";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Eyes from "./components/Eyes";
import Featured from "./components/Featured";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import School from "./components/School";
import AuthPage from "./components/Loginoop";
import Profile from "./components/Profile";

const App = () => {

  return (
    <Router>
      <div className="w-full min-h-screen bg-zinc-900 text-white overflow-hidden">
        <NavbarDemo />
        <BackgroundMusic />

        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              <>
                <LandingPage />
                <Marquee />
                <About />
                <Eyes />
                <Featured />
                <Cards />
                <School />
                <Footer />
              </>
            }
          />

          {/* Login Page Route */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
