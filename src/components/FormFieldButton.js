import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Forms.scss";

export const FormFieldButton = ({ label, onClickHandler }) => {
  return (
    <button
      type="button"
      className="form-button"
      onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export const FormFieldButtonConfirm = ({ label, onClickHandler }) => {
  return (
    <button
      type="button"
      className="form-button form-button--confirm"
      onClick={onClickHandler}
    >
      {label}
    </button>
  );
};

export const IconButton = ({icon, label, onClickHandler}) => {
  return (
    <button type="button" className="icon-button" onClick={onClickHandler}>
      <FontAwesomeIcon icon={icon} /> <span>{label}</span>
    </button>
  );
}

export const ListButton = ({ icon, label, onClickHandler }) => {
  return (
    <button type="button" className="list-button" onClick={onClickHandler}>
      <FontAwesomeIcon icon={icon} /> <span>{label}</span>
    </button>
  );
};

export const IconButtonBar = ({ buttonData }) => {
  return (
    <div className="icon-bar">
      {buttonData.map((button, i) => {
        return (
          <button
            type="button"
            className="icon-bar__button"
            onClick={button.onClickHandler}
            key={`${button.label}-${i}`}
          >
            <FontAwesomeIcon icon={button.icon} /><span> {button.label}</span>
          </button>
        );
      })}
    </div>
    
  );
};
