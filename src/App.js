import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";import "./styles/style.css";
import Navbar from "./components/navbar/Navbar";
import Background from "./components/Background";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home/Home";
import Cv from "./pages/cv/Cv";
import Career from "./pages/career/Career";
import Archive2023 from "./pages/archive2023/Archive2023";
import ScientificWorks from "./pages/scientific-works/ScientificWorks";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="App">
        <Background />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kariera" element={<Career />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/archiwum-2023" element={<Archive2023 />} />
            <Route path="/prace-naukowe" element={<ScientificWorks />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
