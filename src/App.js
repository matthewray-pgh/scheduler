import React from "react";
import "./styles/App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import { DailySchedule } from "./pages/DailySchedule.js";
import Schedule from "./pages/Schedule.js";
import People from "./pages/People.js";
import Configuration from "./pages/Configuration.js";
import Dashboard from "./pages/Dashboard.js";
import Shifts from "./pages/Shifts.js";

const App = () => {
  return (
    <Router>
      <div className="app">
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
      </div>
    </Router>
  );
};

export default App;
