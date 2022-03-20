import React from "react";

import { SideNav } from "../components/SideNav";
import "../styles/Layout.scss";

export const Layout = ({ children }) => {
  return (
    <main>
      <header className="layout__header">
        <h1 className="layout__header--title">Scheduler</h1>
      </header>
      <section className="layout__main">
        <SideNav />
        <section className="layout__content">{children}</section>
      </section>
    </main>
  );
};
