// App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import PersonalInfo from "./pages/PersonalInfo";
import EducationHistory from "./pages/EducationHistory";
import WorkInfo from "./pages/WorkInfo";
import SkillForm from "./pages/SkillForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/form/personal-info" replace />}
        />
        <Route path="/form" element={<Layout />}>
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="education" element={<EducationHistory />} />
          <Route path="work-experience" element={<WorkInfo />} />
          <Route path="skill" element={<SkillForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
