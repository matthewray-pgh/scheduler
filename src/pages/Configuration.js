import React from "react";
import Header from "../components/Header.js";

import "../styles/Configuration.scss";

export const Configuration = () => {
  return (
    <main>
      <Header />
      <section className="page-header-bar">
        <div className="page-header-title">Configuration</div>
        <div className="page-header-details"></div>
      </section>

      <section className="config-main-content"></section>
    </main>
  );
};
