import React from "react";

import "../styles/Forms.scss";

export const FormFieldButton = ({ label, color, onClickHandler }) => {
  return (
    <button
      type="button"
      className="form-button"
      onClick={onClickHandler}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
};
