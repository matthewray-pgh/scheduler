import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./HeaderDetails.scss";

export const HeaderDetails = ({icon, title, subtitle}) => {
  return (
    <section className="header-detail">
      <div className="header-detail__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="header-detail__data">
        <div className="header-detail__data--title">
          {title}
        </div>
        <div className="header-detail__data--subtitle">
          {subtitle}
        </div>
      </div>
    </section>
  );
}

export const HeaderSummary = ({icon, title, line1, line2}) => {
  return (
    <section className="header-detail">
      <div className="header-detail__icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="header-detail__summary">
        <div className="header-detail__summary--title">{title}</div>
        <div className="header-detail__summary--detail">{line1}</div>
        <div className="header-detail__summary--detail">{line2}</div>
      </div>
    </section>
  );
}