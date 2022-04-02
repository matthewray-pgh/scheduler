import React from "react";

import { Outlet } from "react-router-dom";

import { useAuth } from "./Auth";
import { SideNav } from "./SideNav";
import { FormFieldButton } from "./FormFieldButton.js";

import "../styles/Layout.scss";

export const Layout = () => {
  const { token, onLogout } = useAuth();

  const handleUserLogout = () => {
    onLogout();
  };

  return (
    <main>
      <header className="layout__header">
        <h1 className="layout__header--title">Scheduler</h1>
        <div className="layout__header--detail">token: {token}</div>
        <div className="layout__header--logout-button">
          <FormFieldButton label="logout" onClickHandler={handleUserLogout} />
        </div>
      </header>
      <section className="layout__main">
        <SideNav />
        <section className="layout__content">
          <Outlet />
        </section>
      </section>
    </main>
  );
};
