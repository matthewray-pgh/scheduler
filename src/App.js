import React from "react";
import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider, useAuth } from "./components/Auth";
import {
  DailySchedule,
  Dashboard,
  Login,
  ForgotPassword,
  People,
  Schedule,
  Sections,
  Shifts,
} from "./pages";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/people"
              element={
                <ProtectedRoute>
                  <People />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shifts"
              element={
                <ProtectedRoute>
                  <Shifts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sections"
              element={
                <ProtectedRoute>
                  <Sections />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dailySchedule"
              element={
                <ProtectedRoute>
                  <DailySchedule />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        {/* <AppLayout /> */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
