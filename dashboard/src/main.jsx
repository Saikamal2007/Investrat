import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

const AuthGate = () => {
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthenticated");
        return response.json();
      })
      .then(({ user }) => setState({ loading: false, user }))
      .catch(() => {
        window.location.replace(`${FRONTEND_URL}/signup`);
      });
  }, []);

  if (state.loading || !state.user) {
    return <div className="auth-loading">Checking your session...</div>;
  }

  return <Home user={state.user} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthGate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
