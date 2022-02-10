import React from "react";

import { SideNav } from "../components/SideNav";

import "../styles/Dashboard.scss";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <SideNav />
      <section>
        <h1>Dashboard</h1>
      </section>
    </main>
  );
};

export default Dashboard;
