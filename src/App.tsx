import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Prototypes from "./components/Prototypes";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Landing />
      <About />
      <Projects />
      <Skills />
      <Prototypes />
      <Contact />
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
