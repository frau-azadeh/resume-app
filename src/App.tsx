

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PersonalInfo from './pages/PersonalInfo';

import "./App.css";
import Skils from './pages/Skils';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/personal-info" />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/skils" element={<Skils />} />
      </Routes>
    </Router>
  );
};

export default App;

