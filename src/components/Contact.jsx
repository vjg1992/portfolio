import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Simulated)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-gray-800 text-center">
      <h2 className="text-4xl font-bold text-teal-400">Contact Me</h2>
      <form className="mt-8 max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 bg-gray-700 rounded-lg text-white outline-none"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="px-6 py-3 bg-teal-500 text-black font-semibold rounded hover:bg-teal-400">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
