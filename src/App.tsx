// src/App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import PersonalInfo from "./pages/PersonalInfo";
import EducationHistory from "./pages/EducationHistory";
import WorkInfo from "./pages/WorkInfo";
import SkillForm from "./pages/SkillInfo";
import Summary from "./pages/Summary";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" rtl toastClassName="toast-rtl" />
      <Routes>
        {/* مسیر پیش‌فرض */}
        <Route path="/" element={<Navigate to="/form/personal-info" replace />} />

        {/* مسیرهای آزاد */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* مسیرهای محافظت‌شده */}
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="education" element={<EducationHistory />} />
          <Route path="work-experience" element={<WorkInfo />} />
          <Route path="skill" element={<SkillForm />} />
          <Route path="summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
