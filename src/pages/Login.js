import React, { useState } from "react";

import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../components/Auth";

import "../styles/Login.scss";

import { FormFieldText } from "../components/FormFields.js";
import { FormFieldButton } from "../components/FormFieldButton.js";

import {
  faCalendarAlt,
  faUserClock,
  faBusinessTime
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = () => {
  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [authorized, setAuthorized] = useState(false);

  const { onLogin } = useAuth();

  const handleSubmit = async () => {
    onLogin();
  };

  return (
    <>
      {authorized ? <Navigate to="/dashboard" /> : null}
      <main className="login__page">
        <section className="login__banner">
          <FontAwesomeIcon
            icon={faUserClock}
            className="floating-icon--user-clock"
          />
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="floating-icon--calendar"
          />
          <FontAwesomeIcon
            icon={faBusinessTime}
            className="floating-icon--list"
          />
          <div className="login__banner--content">
            <h1>myScheduler</h1>
          </div>
        </section>
        <section className="login__form">
          <div className="login__form-container">
            <h2 className="login__form-container--title">Sign In</h2>
            <FormFieldText label="username" value={loginData.user} />
            <FormFieldText label="password" value={loginData.password} />

            <div className="login__form-container--forgot">
              <Link
                className="login__form-container--forgot-link"
                to={"/forgotPassword"}
              >
                forgot password
              </Link>
            </div>
            <div style={{ display: "grid" }}>
              <FormFieldButton label="login" onClickHandler={handleSubmit} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
