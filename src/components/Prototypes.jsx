import React from "react";

const prototypes = [
  {
    title: "Google Auth Login",
    description: "A fully functional Google authentication system.",
  },
  {
    title: "OTP Authentication",
    description: "Login system using SMS-based OTP verification.",
  },
  {
    title: "Advanced Multi-Factor Login",
    description: "Secure authentication with multiple verification steps.",
  },
];

const Prototypes = () => {
  return (
    <section id="prototypes" className="py-20 bg-gray-900 text-center">
      <h2 className="text-4xl font-bold text-teal-400">Working Prototypes</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {prototypes.map((proto, index) => (
          <div key={index} className="w-80 p-5 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white">{proto.title}</h3>
            <p className="text-gray-400 mt-2">{proto.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Prototypes;
