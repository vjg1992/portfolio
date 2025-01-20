import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaSun, FaMoon, FaSearch, FaBars, FaTimes, FaUser, FaBriefcase, FaLightbulb } from "react-icons/fa";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const sections = [
    { name: "Home", icon: <FaUser />, id: "home" },
    { name: "About", icon: <FaLightbulb />, id: "about" },
    { name: "Projects", icon: <FaBriefcase />, id: "projects" },
    { name: "Skills", icon: <FaLightbulb />, id: "skills" },
    { name: "Prototypes", icon: <FaLightbulb />, id: "prototypes" },
    { name: "Contact", icon: <FaLightbulb />, id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-opacity-90 backdrop-blur-lg shadow-md z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Animated Logo */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="text-2xl font-bold text-primary cursor-pointer"
        >
          Vijay G
        </ScrollLink>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {sections.map((section) => (
            <li key={section.id}>
              <ScrollLink
                to={section.id}
                smooth={true}
                duration={500}
                spy={true}
                offset={-60}
                activeClass="text-teal-400 underline underline-offset-8"
                className={`cursor-pointer text-lg font-medium hover:text-teal-400 transition ${
                  activeSection === section.id ? "text-teal-400" : "text-gray-300"
                }`}
              >
                {section.icon} {section.name}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-10 rounded-full bg-gray-700 text-white outline-none focus:ring-2 focus:ring-teal-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 text-2xl p-2 rounded-full bg-gray-700 text-white hover:text-teal-400 transition"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* CTA Button */}
        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="hidden md:inline-block px-6 py-2 ml-4 bg-teal-500 text-black rounded-lg font-semibold hover:bg-teal-400 transition"
        >
          Hire Me
        </ScrollLink>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-gray-800 p-6 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4">
          {sections.map((section) => (
            <li key={section.id}>
              <ScrollLink
                to={section.id}
                smooth={true}
                duration={500}
                className="text-xl text-gray-300 hover:text-teal-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                {section.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
