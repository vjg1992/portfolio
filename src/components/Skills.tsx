const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🌐" },
  { name: "TypeScript", icon: "📝" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-800 text-center">
      <h2 className="text-4xl font-bold text-teal-400">Skills</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="w-40 p-4 bg-gray-700 rounded-lg shadow-md">
            <div className="text-4xl">{skill.icon}</div>
            <p className="mt-2 text-xl font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
