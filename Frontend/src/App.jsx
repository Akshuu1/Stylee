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
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";

import RunwayTrends from "./components/Trends/RunwayTrends";
import ManishMalhotra from "./components/Trends/ManishMalhotra";
import StreetStyle from "./components/Trends/StreetStyle";
import Jacquemus from "./components/Trends/Jacquemus";
import FutureFashion from "./components/Trends/FutureFashion";
import RecycledCouture from "./components/Trends/RecycledCouture";
import CoquetteCore from "./components/Trends/CoquetteCore";

import AdminDashboard from "./components/AdminDashboard";
import Contact from "./components/Contact";
import AboutPage from "./components/AboutPage";
import Wishlist from "./components/Wishlist";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  React.useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-zinc-900 text-white overflow-hidden">
          <NavbarDemo />
          <BackgroundMusic />

          <Routes>
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

            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/profile" element={<Profile />} />

            {/* Product Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Trends Routes */}
            <Route path="/trends/runway-trends" element={<RunwayTrends />} />
            <Route path="/trends/manish-malhotra" element={<ManishMalhotra />} />
            <Route path="/trends/street-style" element={<StreetStyle />} />
            <Route path="/trends/jacquemus" element={<Jacquemus />} />
            <Route path="/trends/future-fashion" element={<FutureFashion />} />
            <Route path="/trends/recycled-couture" element={<RecycledCouture />} />
            <Route path="/trends/coquette-core" element={<CoquetteCore />} />

            {/* Contact Route */}
            <Route path="/contact" element={<Contact />} />

            {/* About Page Route */}
            <Route path="/about" element={<AboutPage />} />

            {/* Wishlist Route */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

