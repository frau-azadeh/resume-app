import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
// ساخته میشه

// Guards
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import EducationHistory from "./pages/EducationHistory";
import Login from "./pages/Login";
// User Pages
import PersonalInfo from "./pages/PersonalInfo";
import SignupPage from "./pages/Signup";
import SkillForm from "./pages/SkillInfo";
import Summary from "./pages/Summary";
import WorkInfo from "./pages/WorkInfo";
// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import ApplicationsPage from "./pages/admin/ApplicationsPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" rtl toastClassName="toast-rtl" />
      <Routes>
        {/* مسیر پیش‌فرض */}
        <Route
          path="/"
          element={<Navigate to="/form/personal-info" replace />}
        />

        {/* مسیرهای عمومی کاربران */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* مسیر لاگین ادمین */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* مسیرهای محافظت‌شده کاربران */}
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

        {/* مسیرهای محافظت‌شده ادمین */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>به پنل مدیریت خوش آمدید</div>} />
          <Route path="applications" element={<ApplicationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
