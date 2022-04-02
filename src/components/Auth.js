import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = React.createContext(null);

const generateToken = function () {
  var rand = function () {
    return Math.random().toString(36).substr(2);
  };
  return rand() + rand();
};

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(generateToken()), 500);
  });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
