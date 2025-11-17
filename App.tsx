import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criar" element={<CreatePlan />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
