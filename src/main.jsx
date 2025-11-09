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
      <nav className="bg-gray-800 text-gray-200 p-4 flex gap-4">
        <Link to="/" className="hover:text-white font-semibold">Home</Link>
        <Link to="/dialogues" className="hover:text-white font-semibold">Falas</Link>
        <Link to="/about" className="hover:text-white font-semibold">Sobre</Link>
      </nav>
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
