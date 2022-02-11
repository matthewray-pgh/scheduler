import React from "react";
import "./styles/App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home.js";
import { DailySchedule } from "./pages/DailySchedule.js";
import Schedule from "./pages/Schedule.js";
import People from "./pages/People.js";
import Configuration from "./pages/Configuration.js";
import Dashboard from "./pages/Dashboard.js";
import Shifts from "./pages/Shifts.js";
import Sections from "./pages/Sections.js";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/people">
            <People />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/shifts">
            <Shifts />
          </Route>
          <Route path="/sections">
            <Sections />
          </Route>
          <Route path="/dailySchedule">
            <DailySchedule />
          </Route>
          <Route path="/configuration">
            <Configuration />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
