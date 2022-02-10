import React from "react";

import "../styles/Forms.scss";

const FormFieldCheckboxes = ({ label, options }) => {
  const height = options.length > 0 ? options.length * 30 : 20;
  return (
    <div className="form-field" style={{ height: height }}>
      <label>{label}</label>
      {options.map((o, i) => {
        return (
          <div>
            <input type="checkbox" key={i} value={o.id} name={o.name} />
            <label for={o.name}>{o.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default FormFieldCheckboxes;
