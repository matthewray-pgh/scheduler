import React from "react";

import "../styles/Forms.scss";

const FormFieldText = ({ label, value }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input type="text" placeholder={label} defaultValue={value} />
    </div>
  );
};

export default FormFieldText;
