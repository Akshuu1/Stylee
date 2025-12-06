"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "/src/components/ui/resizable-navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function NavbarDemo() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { name: "Products", link: "/products" },
    { name: "About", link: "#about" },
    { name: "Trends", link: "#Trends" },
    { name: "Knowledge", link: "#Knowledge" },
    { name: "Contact", link: "/contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      style={{ fontFamily: "Gilroy-Light" }}
      className="fixed z-[100000] w-full mt-4"
    >
      <Navbar>
        {/* 💻 Desktop Navigation */}
        <NavBody>
          <NavbarLogo onClick={() => navigate('/')} />
          <NavItems
            items={navItems}
            onItemClick={(item) => {
              if (item.link.startsWith('#')) {
                // For anchor links, check if we're on home page
                if (window.location.pathname === '/') {
                  // Already on home page, just scroll
                  const element = document.querySelector(item.link);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to home page with hash
                  navigate('/' + item.link);
                  // After navigation, scroll to the section
                  setTimeout(() => {
                    const element = document.querySelector(item.link);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              } else {
                // For routes, use navigate
                navigate(item.link);
              }
            }}
          />

          <div className="flex items-center gap-4">
            {isAuthenticated() ? (
              <>
                <NavbarButton
                  variant="secondary"
                  onClick={() => navigate("/profile")}
                  className="font-semibold hover:dark:bg-neutral-800 rounded-full transition-all"
                >
                  {user?.name || "Profile"}
                </NavbarButton>
              </>
            ) : (
              <NavbarButton
                variant="secondary"
                onClick={() => navigate("/login")}
                className="font-semibold hover:dark:bg-neutral-800 rounded-full transition-all"
              >
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* 📱 Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/');
            }} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <div
                key={`mobile-link-${idx}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (item.link.startsWith('#')) {
                    // For anchor links, check if we're on home page
                    if (window.location.pathname === '/') {
                      // Already on home page, just scroll
                      const element = document.querySelector(item.link);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      // Navigate to home page with hash
                      navigate('/' + item.link);
                      // After navigation, scroll to the section
                      setTimeout(() => {
                        const element = document.querySelector(item.link);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  } else {
                    // For routes, use navigate
                    navigate(item.link);
                  }
                }}
                className="relative text-neutral-600 dark:text-neutral-300 text-lg py-2 cursor-pointer"
              >
                <span className="block">{item.name}</span>
              </div>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              {isAuthenticated() ? (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/profile");
                  }}
                  variant="primary"
                  className="w-full font-semibold transition-all"
                >
                  {user?.name || "Profile"}
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  variant="primary"
                  className="w-full font-semibold transition-all"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <DummyContent />
    </div>
  );
}

// You can remove this later if unnecessary
const DummyContent = () => <div></div>;

