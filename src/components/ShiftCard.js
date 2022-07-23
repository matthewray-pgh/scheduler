import React from "react";

import "../styles/ShiftCard.scss";

const sectionOptions = [
  { id: 0, value: "inside" },
  { id: 1, value: "patio" },
  { id: 2, value: "bar" },
  { id: 3, value: "side-bar" },
  { id: 4, value: "back room" },
  { id: 5, value: "patio-bar" },
];

const timeOptions = [
  { id: 0, value: " -- " },
  { id: 1, value: " AM " },
  { id: 2, value: " PM " },
];

export const ShiftCard = () => {
  return (
    <div className="shift-card">
      <input type="text" className="shift-card__input" placeholder="shift" />
      <input type="text" className="shift-card__input" placeholder="section" />
      {/* <AutoCompleteInput options={timeOptions} /> */}
      {/* <AutoCompleteInput options={sectionOptions} /> */}
    </div>
  );
};

export const AutoCompleteInput = (options) => {
  return (
    <div>
      <input className="shift-card__auto-complete" type="text" />
      <div>
        {options.options.map((opt, i) => {
          return (
            <div className="shift-card__auto-complete--options" key={i}>
              {opt.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
