import "./App.css";
import LoginPage from "./components/LoginPage";
import Transaction from "./components/Transaction";
import {  Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ToastProvider from "./tools/noticToast.jsx";
import PublicLayout from "./layout/PublicLayout";
import Register from "./components/Register";
import ProtectLayout from "./layout/ProtectLayout";
import AddTransaction from "./components/TransactionForm.jsx";
import useAuthStore from "./store/authStore.js";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <ToastProvider />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
