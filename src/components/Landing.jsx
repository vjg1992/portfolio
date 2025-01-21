import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useTheme } from '../context/ThemeContext';
import ChatbotPro from "./ChatbotPro";
import DynamicTextDisplay from "./DynamicTextDisplay";

const Landing = () => {
  const { theme } = useTheme();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const quotes = [
    "Innovation is the ability to see change as an opportunity – not a threat.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Believe you can and you're halfway there.",
    "Strive not to be a success, but rather to be of value.",
    "Code is like humor. When you have to explain it, it's bad."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            color: { value: theme === "dark" ? "#ffffff" : "#000000" },
            opacity: {
              value: theme === "dark" ? 0.5 : 0.3
            },
          },
          background: {
            color: {
              value: "transparent",
            },
          },
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-center">
        
        <div className="w-full aspect-video">
          <div className="w-full h-full border-2 border-teal-500 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-semibold text-gray-800 dark:text-gray-200 shadow-xl transition-colors duration-300 hover:border-teal-400">
            <span className="flex items-center gap-2">
              🚀 Exciting Intro Video Coming Soon!
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center text-center space-y-8 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-center"
          >
            <DynamicTextDisplay />
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-4">
              Crafting Digital Experiences | Full-Stack Developer
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a 
              href="#projects" 
              className="px-8 py-4 rounded-xl bg-teal-500 text-white font-bold transition-colors duration-300 shadow-lg hover:bg-teal-400"
            >
              View Projects
            </motion.a>
            <motion.a 
              href="resume.pdf" 
              download 
              className="px-8 py-4 rounded-xl bg-gray-700 text-white font-bold transition-colors duration-300 shadow-lg hover:bg-gray-600 flex items-center gap-3"
            >
              <FaDownload /> Download Resume
            </motion.a>
          </div>

          <div className="flex justify-center gap-8 mt-6">
            <a href="https://github.com/vjg1992" className="text-gray-700 dark:text-gray-300 text-3xl hover:text-teal-500 transition-colors duration-300">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/1992vijayg/" className="text-gray-700 dark:text-gray-300 text-3xl hover:text-teal-500 transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" className="text-gray-700 dark:text-gray-300 text-3xl hover:text-teal-500 transition-colors duration-300">
              <FaTwitter />
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5, duration: 1 }} 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 italic mt-8 text-center"
          >
            "{randomQuote}"
          </motion.div>
        </div>
      </div>

      <ChatbotPro />
    </section>
  );
};

export default Landing;