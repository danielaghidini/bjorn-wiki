import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dialogues from "./pages/Dialogues";
import Quests from "./pages/Quests";
import About from "./pages/About";

const baseName = import.meta.env.MODE === "production" ? "/bjorn-wiki" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dialogues" element={<Dialogues />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
