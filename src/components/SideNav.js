import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/SideNav.scss";
import {
  faCalendarAlt,
  faChartBar,
  faCogs,
  faHome,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const SideNav = () => {
  return (
    <aside className="aside">
      <ul className="aside__nav">
        <li>
          <Link to="/">
            <FontAwesomeIcon className="aside__nav--icon" icon={faHome} />
            <span className="aside__nav--text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FontAwesomeIcon className="aside__nav--icon" icon={faChartBar} />
            <span className="aside__nav--text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/schedule">
            <FontAwesomeIcon
              className="aside__nav--icon"
              icon={faCalendarAlt}
            />
            <span className="aside__nav--text">Schedule</span>
          </Link>
        </li>
        <li>
          <Link to="/Shifts">
            <FontAwesomeIcon className="aside__nav--icon" icon={faTasks} />
            <span className="aside__nav--text">Shifts</span>
          </Link>
        </li>
        <li>
          <Link to="/sections">
            <FontAwesomeIcon className="aside__nav--icon" icon={faTasks} />
            <span className="aside__nav--text">Sections</span>
          </Link>
        </li>
        <li>
          <Link to="/people">
            <FontAwesomeIcon className="aside__nav--icon" icon={faUsers} />
            <span className="aside__nav--text">People</span>
          </Link>
        </li>
        <li>
          <Link to="/configuration">
            <FontAwesomeIcon className="aside__nav--icon" icon={faCogs} />
            <span className="aside__nav--text">Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
