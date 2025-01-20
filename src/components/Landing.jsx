import React from "react";

const Landing = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-teal-400">Hi, I'm Vijay G</h1>
        <p className="mt-4 text-lg text-gray-300">
          Crafting Digital Experiences | Full-Stack Developer
        </p>
        <div className="mt-6">
          <a href="#projects" className="px-6 py-3 bg-teal-500 text-black font-semibold rounded hover:bg-teal-400">
            View Projects
          </a>
          <a href="#contact" className="ml-4 px-6 py-3 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600">
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
