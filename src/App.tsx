import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";

// User Pages
import PersonalInfo from "./pages/PersonalInfo";
import EducationHistory from "./pages/EducationHistory";
import WorkInfo from "./pages/WorkInfo";
import SkillForm from "./pages/SkillInfo";
import Summary from "./pages/Summary";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import ApplicationsPage from "./pages/admin/ApplicationsPage"; // ساخته میشه

// Guards
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";

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
