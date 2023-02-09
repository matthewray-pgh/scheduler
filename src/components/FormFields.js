import React from "react";

import "../styles/Forms.scss";

export const FormFieldText = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FormFieldEmail = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="email"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FormFieldPhone = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="tel"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FormFieldDate = ({ label, value, onChange }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="date"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
