import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaSun, FaMoon, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import Logo from "../assets/VijayG-Animation1.gif";

// Custom hook for managing theme
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // Check system preference if no stored theme
    if (!savedTheme) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    
    return savedTheme;
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);

    // Optional: Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1f2937" : "#ffffff"
      );
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return [theme, toggleTheme];
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPos = document.documentElement.scrollTop;
      const scrolled = (scrollPos / scrollHeight) * 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/75 dark:bg-gray-900/75 transition-colors duration-300 shadow-lg z-50 border-b border-teal-500/50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Animated Logo */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={Logo}
            alt="Vijay G Logo"
            className="h-16 w-auto rounded-3xl"
          />
        </ScrollLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {["Home", "About", "Projects", "Skills", "Prototypes", "Contact"].map((link, index) => (
            <li key={index} className="relative group">
              <ScrollLink
                to={link.toLowerCase()}
                smooth={true}
                duration={500}
                className="cursor-pointer text-gray-800 dark:text-gray-200 hover:text-teal-400 transition"
              >
                {link}
              </ScrollLink>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-teal-400 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-teal-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 text-2xl p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:text-teal-400 transition"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        {/* CTA Button */}
        <ScrollLink
          to="contact"
          smooth={true}
          duration={500}
          className="hidden md:inline-block px-6 py-2 ml-4 bg-teal-500 text-white dark:bg-teal-600 rounded-lg font-semibold hover:bg-teal-400 dark:hover:bg-teal-500 transition"
        >
          Hire Me
        </ScrollLink>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-800 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className="fixed left-0 h-1 bg-teal-400 transition-all duration-150"
        style={{ width: `${scrollPercentage}%` }}
      ></div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-screen bg-white/95 dark:bg-gray-900/95 text-center flex flex-col items-center justify-center space-y-8 transition-all">
          {["Home", "About", "Projects", "Skills", "Prototypes", "Contact"].map((link, index) => (
            <ScrollLink
              key={index}
              to={link.toLowerCase()}
              smooth={true}
              duration={500}
              className="text-2xl font-bold text-gray-800 dark:text-gray-200 hover:text-teal-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </ScrollLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;