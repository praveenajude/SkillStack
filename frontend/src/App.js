import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/certifications" element={<Certifications />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
