import React, { useState, useEffect } from "react";
import "./styles/App.scss";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { 
  AuthProvider, 
  // useAuth 
} from "./components/Auth";
import {
  Configuration,
  Dashboard,
  Login,
  ForgotPassword,
  People,
  PeopleForm,
  Schedule,
  ScheduleForm,
  Sections,
} from "./pages";

// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuth();
//   const location = useLocation();
//   if (!token) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }
//   return children;
// };

const App = () => {
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", (e) => {
      setMQuery(e.target);
    });
    return () => mediaQuery.removeEventListener("change", setMQuery);
  }, [mQuery]);

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
                // <ProtectedRoute>
                <Dashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/people"
              element={
                // <ProtectedRoute>
                <People />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/people/:id"
              element={
                // <ProtectedRoute>
                <PeopleForm />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                // <ProtectedRoute>
                <Schedule />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/schedule/:id"
              element={
                // <ProtectedRoute>
                <ScheduleForm />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/sections"
              element={
                // <ProtectedRoute>
                <Sections />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/configuration"
              element={
                // <ProtectedRoute>
                <Configuration />
                // </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
        {/* <AppLayout /> */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
