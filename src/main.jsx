import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Dialogues from "./pages/Dialogues";
import About from "./pages/About";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 px-8 py-4 flex gap-6 items-center shadow-md fixed top-0 left-0 w-full z-50">
        <Link to="/" className="hover:text-white font-semibold transition">Home</Link>
        <Link to="/dialogues" className="hover:text-white font-semibold transition">Dialogues</Link>
        <Link to="/about" className="hover:text-white font-semibold transition">About</Link>
      </nav>
      <div className="h-20"></div>
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dialogues" element={<Dialogues />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
