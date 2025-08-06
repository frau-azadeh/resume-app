// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>در حال بررسی وضعیت ورود...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
