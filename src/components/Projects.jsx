import React from "react";

const projects = [
  {
    title: "Logic-I",
    description: "A warehouse management system for logistics.",
    link: "#",
  },
  {
    title: "ShopPlusPlus",
    description: "An e-commerce platform for pet products.",
    link: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 text-center">
      <h2 className="text-4xl font-bold text-teal-400">My Projects</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {projects.map((project, index) => (
          <div key={index} className="w-80 bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <a href={project.link} className="mt-4 inline-block text-teal-400 hover:underline">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
