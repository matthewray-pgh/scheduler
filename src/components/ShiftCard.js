import React, { useState, useCallback } from "react";

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

export const ShiftCard = ({update, shift, section, day }) => {
  const [focus, setFocus] = useState(false);
  const [shiftValue, setShiftValue] = useState(shift);
  const [sectionValue, setSectionValue] = useState(section);

  const handleShiftChange = useCallback((e) => {
    setShiftValue(e.target.value);
  }, []);

  const handleSectionChange = useCallback((e) => {
    setSectionValue(e.target.value);
  },[]);

  const updateSchedule = useCallback(() => {
    return update(shiftValue, sectionValue, day);
  }, [update, shiftValue, sectionValue, day]);

  return (
    <div className="shift-card">
      <div className="shift-card__column-1">
        <label className="shift-card__label" htmlFor="shift">
          shift
        </label>
        <input
          name="shift"
          type="text"
          value={shiftValue}
          className="shift-card__input"
          onChange={handleShiftChange}
          onBlur={updateSchedule}
        />
      </div>

      <div className="shift-card__column-2">
        <label className="shift-card__label" htmlFor="section">
          section
        </label>
        <input
          name="section"
          type="text"
          value={sectionValue}
          className="shift-card__input"
          onChange={handleSectionChange}
          onBlur={updateSchedule}
        />
      </div>

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
