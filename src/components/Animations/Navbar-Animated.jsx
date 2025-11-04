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

export function NavbarDemo() {
  const navigate = useNavigate();

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Trends", link: "#Trends" },
    { name: "Knowledge", link: "#Knowledge" },
    { name: "Contact", link: "#contact" },
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
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              onClick={() => navigate("/login")}
              className="font-semibold hover:dark:bg-neutral-800 rounded-full transition-all"
            >
              Login
            </NavbarButton>
          </div>
        </NavBody>

        {/* 📱 Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 text-lg py-2"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                variant="primary"
                className="w-full font-semibold  transition-all"
              >
                Login
              </NavbarButton>
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
