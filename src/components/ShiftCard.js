import React, { useState, useCallback } from "react";

import "../styles/ShiftCard.scss";

export const ShiftCard = ({update, shift, section, day }) => {
  const [shiftValue, setShiftValue] = useState(shift);
  const [sectionValue, setSectionValue] = useState(section);

  const handleShiftChange = useCallback((e) => {
    setShiftValue(e.target.value);
  }, []);

  const handleSectionChange = useCallback((e) => {
    setSectionValue(e.target.value);
  },[]);

  const updateShift = useCallback(() => {
    console.log('updateShift');
  },[]);
    // return update(shiftValue, sectionValue, day);
  // }, [update, shiftValue, sectionValue, day]);

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
          onBlur={updateShift}
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
          onBlur={updateShift}
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
