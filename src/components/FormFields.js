import React from "react";

import "../styles/Forms.scss";

export const FormFieldText = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="text"
        placeholder={label}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FormFieldEmail = ({ label, value }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input type="email" placeholder={label} defaultValue={value} />
    </div>
  );
};

export const FormFieldPhone = ({ label, value }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input type="tel" placeholder={label} defaultValue={value} />
    </div>
  );
};

export const FormFieldDate = ({ label, value }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input type="date" placeholder={label} defaultValue={value} />
    </div>
  );
};
