// src/App.tsx
import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Layout />
    </BrowserRouter>
  );
};

export default App;
