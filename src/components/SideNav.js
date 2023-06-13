import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "./Auth";

import "../styles/SideNav.scss";
import {
  faCalendarAlt,
  faChartBar,
  faCogs,
  faUsers,
  faSignOutAlt,
  faUserAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export const SideNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activePage, setActivePage] = useState(null);
  const { token, onLogout } = useAuth();

  const handleUserLogout = () => {
    setShowMobileMenu(false);
    onLogout();
  };

  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);

    // eslint-disable-next-line
  }, []);

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleOnNavClicked = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <aside className="aside">
        <div className="aside__heading">
          <div>
            <h1>mySchedule</h1>
          </div>
          <button
            className="aside__mobile-button"
            onClick={handleMobileMenuClick}
          >
            <FontAwesomeIcon
              className="aside__mobile-button--icon"
              icon={showMobileMenu ? faTimes : faBars}
            />
          </button>
        </div>
        <div className="aside__nav">
          <Menu
            token={token}
            handleUserLogout={handleUserLogout}
            activePage={activePage}
          />
        </div>
      </aside>

      <div
        className={showMobileMenu ? "mobile__nav--show" : "mobile__nav--hide"}
      >
        <Menu
          token={token}
          handleUserLogout={handleUserLogout}
          handleUserNavigate={handleOnNavClicked}
        />
      </div>
    </>
  );
};

const Menu = ({ token, handleUserLogout, handleUserNavigate, activePage }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/dashboard" onClick={handleUserNavigate}>
            <FontAwesomeIcon className="aside__nav--icon" icon={faChartBar} />
            <span className="aside__nav--text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/schedule" onClick={handleUserNavigate}>
            <FontAwesomeIcon
              className="aside__nav--icon"
              icon={faCalendarAlt}
            />
            <span className="aside__nav--text">Schedule</span>
          </Link>
        </li>
        <li>
          <Link to="/people" onClick={handleUserNavigate}>
            <FontAwesomeIcon className="aside__nav--icon" icon={faUsers} />
            <span className="aside__nav--text">People </span>
          </Link>
        </li>
        <li>
          <Link to="/configuration" onClick={handleUserNavigate}>
            <FontAwesomeIcon className="aside__nav--icon" icon={faCogs} />
            <span className="aside__nav--text">Settings</span>
          </Link>
        </li>
      </ul>
      <div className="aside__nav--divider"></div>
      <ul>
        <li>
          <Link to="/" onClick={handleUserNavigate}>
            <FontAwesomeIcon className="aside__nav--icon" icon={faUserAlt} />
            <span className="aside__nav--text">Account</span>
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={handleUserLogout}>
            <FontAwesomeIcon className="aside__nav--icon" icon={faSignOutAlt} />
            <span className="aside__nav--text">Logout</span>
          </Link>
        </li>
      </ul>
      <div className="aside__text">token: {token}</div>
    </>
  );
};
