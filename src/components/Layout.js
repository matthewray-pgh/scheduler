import React from "react";

import { SideNav } from "../components/SideNav";
import "../styles/Layout.scss";

export const Layout = ({ children }) => {
  return (
    <main className="layout__main">
      <SideNav />
      <section className="layout__content">{children}</section>
    </main>
  );
};
