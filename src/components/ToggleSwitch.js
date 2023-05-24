import React from "react";
import "../styles/ToggleSwitch.scss";

export const ToggleSwitch =({ label, handleChange })  => {

  return (
    <div className="toggle-switch">
      <span className="toggle-switch__text">{label}</span>
      <div className="toggle-switch__control">
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          onChange={handleChange}
          name={label}
          id={label}
        />
        <label className="toggle-switch__label" htmlFor={label}>
          <span className="toggle-switch__inner" />
          <span className="toggle-switch__switch" />
        </label>
      </div>
    </div>
  );};