import React from "react";
import { Link } from "react-router-dom";

import "../styles/Header.scss";

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-brand">
        <Link className="site-name" to="/">
          Scheduler
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/configuration">Configuration</Link>
          </li>
        </ul>
      </nav>

      <div className="user-details">
        <label>logged in as :</label>
        <label>UserName</label>
      </div>
    </header>
  );
};

export default Header;
