import React from "react";

import { Outlet } from "react-router-dom";

import { SideNav } from "./SideNav";

import "../styles/Layout.scss";

export const Layout = () => {
  return (
    <main>
      <section className="layout__main">
        <SideNav />
        <section className="layout__content">
          <Outlet />
        </section>
      </section>
    </main>
  );
};
