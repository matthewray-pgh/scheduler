import React, { useState } from "react";
import ShiftTextTranslator from "../components/ShiftTextTranslator";

import "../styles/ShiftSelector.scss";

const ShiftSelectorCard = ({
  isVisible,
  closeFunc,
  saveFunc,
  personIndex,
  dayIndex,
  details,
  schedule,
}) => {
  const [shift, setShift] = useState();
  const [start, setStart] = useState();
  const [section, setSection] = useState();

  const handleCancelClick = () => {
    closeFunc();
  };

  const handleOnSelectChange = (event) => {
    setShift(parseInt(event.target.value));
    details.shift = event.target.value;
  };

  const handleStartChange = (event) => {
    setStart(event.target.value);
    details.start = event.target.value;
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
    details.section = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //create object
    var newShift = {
      day: dayIndex,
      shift: details.shift,
      start: details.start,
      section: details.section || null,
    };

    schedule[personIndex].schedule.push(newShift);

    saveFunc(schedule);
    closeFunc();
  };

  return (
    <div className={isVisible ? "shift-select-container" : "hide-cell"}>
      <div className="shift-select-card-employee-information">
        <div>Day of Week : {dayIndex} </div>
        <div>Employee Name : {personIndex}</div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="shift-select-card-form">
          <label className="shift-select-card-form-label">shift: </label>
          <select
            name="shift"
            className="text-field"
            value={details.shift}
            onChange={(e) => handleOnSelectChange(e)}
          >
            <option value={0}>--</option>
            <option value={2}>
              AM
              {/* <ShiftTextTranslator val={1} /> */}
            </option>
            <option value={3}>
              PM
              {/* <ShiftTextTranslator val={2} /> */}
            </option>
          </select>

          <label className="shift-select-card-form-label">start: </label>
          <input
            name="start"
            type="text"
            className="text-field"
            placeholder="start time"
            defaultValue={details.start || ""}
            onChange={(e) => handleStartChange(e)}
          />
          <label className="shift-select-card-form-label">section:</label>
          <input
            name="section"
            type="text"
            className="text-field"
            placeholder="sections"
            defaultValue={details.section || ""}
            onChange={(e) => handleSectionChange(e)}
          />
        </div>

        <div className="shift-selector-card-form-controls">
          <button
            type="button"
            className="button"
            onClick={() => handleCancelClick()}
          >
            cancel
          </button>

          <input type="submit" className="button" value="save" />
        </div>
      </form>
    </div>
  );
};

export default ShiftSelectorCard;
