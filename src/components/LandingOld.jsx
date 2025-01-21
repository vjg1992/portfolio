import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useTheme } from '../context/ThemeContext';
import ChatbotPro from "./ChatbotPro";

const Landing = () => {
  const { theme } = useTheme();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section
      id="home"
      className="h-screen w-full flex items-center justify-center relative overflow-hidden transition-all duration-500 px-10 md:px-20"
    >
      {/* Particles Background */}
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            color: { value: theme === "dark" ? "#ffffff" : "#1f2937" },
          },
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl">
        
        {/* Left Column: Video Placeholder */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="w-full h-96 md:h-[400px] border-2 border-teal-500 rounded-lg flex items-center justify-center text-xl font-semibold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            🚀 Exciting Intro Video Coming Soon!
          </div>
        </div>

        {/* Right Column: Content Section */}
        <div className="md:w-1/2 flex flex-col items-center justify-between md:items-start md:text-left space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold text-teal-500 dark:text-teal-400"
          >
            <Typewriter
              options={{
                strings: ["Let's Build Something Amazing!", "Hi, I'm Vijay G", "Crafting Digital Experiences"],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
          </motion.h1>

          <p className="text-xl text-gray-700 dark:text-gray-300">
            Crafting Digital Experiences | Full-Stack Developer
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-teal-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:bg-teal-400"
            >
              View Projects
            </a>
            <a
              href="resume.pdf"
              download
              className="px-6 py-3 rounded-lg bg-gray-700 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <FaDownload /> Download Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-8 mt-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/vjg1992"
              className="text-gray-800 dark:text-white text-3xl hover:text-teal-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.linkedin.com/in/1992vijayg/"
              className="text-gray-800 dark:text-white text-3xl hover:text-teal-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://twitter.com"
              className="text-gray-800 dark:text-white text-3xl hover:text-teal-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </motion.a>
          </div>

          {/* Quotes Section */}
          <div className="text-lg text-gray-600 dark:text-gray-300 italic mt-6">
            "Innovation is the ability to see change as an opportunity – not a threat."
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatbotPro />
    </section>
  );
};

export default Landing;
