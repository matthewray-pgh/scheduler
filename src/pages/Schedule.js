import React, { useState } from "react";
import Header from "../components/Header.js";

import "../styles/Schedule.scss";

import testData from "../assets/dataFile.json";
import config from "../assets/appConfig.json";
import shiftDefaults from "../assets/scheduleTemplate.json";
import mockSchedule from "../assets/mockSchedule.json";
import personDetails from "../assets/personDetails";

import ShiftSelectorCard from "../components/ShiftSelectorCard";

const Schedule = () => {
  const [schedule, setSchedule] = useState(testData);
  const [mock, setMock] = useState(mockSchedule);
  const [people, setPeople] = useState(personDetails);

  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);
  const [shiftDayOfWeek, setShiftDayOfWeek] = useState(0);
  const [shiftDetails, setShiftDetails] = useState({
    day: shiftDefaults.day,
    shift: shiftDefaults.shift,
    start: shiftDefaults.start,
    section: shiftDefaults.section,
  });
  const [isVisible, setIsVisible] = useState(false);

  const loadShiftDefaults = () => {
    setShiftDetails({
      day: shiftDefaults.day,
      shift: shiftDefaults.shift,
      start: shiftDefaults.start,
      section: shiftDefaults.section,
    });
  };

  const handleClickShift = (personId, shiftDetails) => {
    //check if schedule exists
    if (shiftDetails.shift !== 0) {
      setShiftDetails({
        day: shiftDetails.day,
        shift: shiftDetails.shift,
        start: shiftDetails.start,
        section: shiftDetails.section,
      });
    } else {
      //reset to defaults
      loadShiftDefaults();
    }

    //set person and day state
    setSelectedPersonIndex(personId);
    setShiftDayOfWeek(shiftDetails.day);

    if (!isVisible) {
      setIsVisible(true);
    }
  };

  const closeShift = () => {
    setIsVisible(false);
  };

  const handleClickPerson = (i) => {
    setSelectedPersonIndex(i);
  };

  const handleToolboxShiftClick = () => {
    setIsVisible(!isVisible);
  };

  const getScheduleCell = (id, schedule) => {
    if (schedule.available.length >= 1) {
      return (
        <div
          className="schedule-cell"
          style={{ borderLeftColor: "#dddddd" }}
          onClick={() => handleClickShift(id, schedule)}
        >
          <label></label>
        </div>
      );
    } else {
      return <div className="shift-unavailable">UNAVAILABLE</div>;
    }
  };

  const generateNewSchedule = () => {
    //reset schedule
    let newSchedule = [];
    setMock(newSchedule);

    newSchedule = people.map((p) => ({
      personId: p.id,
      personName: p.firstName + " " + p.lastName,
      schedule: getSchedule(p.available),
    }));

    //finished
    setMock(newSchedule);
  };

  const getSchedule = (availArr) => {
    let schedule = [];
    let shift = {};
    availArr.map((a, i) => {
      if (a === 0) {
        shift = {
          day: i,
          available: [],
          shifts: [],
        };
      } else {
        shift = {
          day: i,
          available: [a],
          shifts: [],
        };
      }
      schedule.push(shift);
      shift = {};
    });
    return schedule;
  };

  return (
    <main>
      <Header />
      <section className="schedule-page-header-bar">
        <div className="page-header-title">Schedule</div>
        <div className="page-header-details">
          Schedule Dates : dateFrom - dateTo
        </div>
        <div className="page-header-bar-controls">
          <button className="button" onClick={() => generateNewSchedule()}>
            New
          </button>
          <button className="button">Save</button>
          <button className="button">Publish</button>
        </div>
      </section>

      <section className="main-content">
        <div className="table">
          {/* future idea */}
          {/* <div className="table-row">Daily Chart Row</div> */}

          {/* table column headers */}
          <div className="table-row">
            <div className="table-header-cell">Employee</div>
            <div className="table-header-cell">
              <div>SUN 7/26</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>MON 7/27</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>TUE 7/28</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>WED 7/29</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>THU 7/30</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>FRI 7/31</div>
              <div> 0 / 0 </div>
            </div>
            <div className="table-header-cell">
              <div>SAT 8/1</div>
              <div> 0 / 0 </div>
            </div>
          </div>

          <div className="table-body">
            {mock.map((m, i) => (
              <div
                className={i % 2 === 0 ? "table-row-even" : "table-row-odd"}
                key={i}
              >
                <div
                  className="employee-cell"
                  onClick={() => handleClickPerson(m.personId)}
                >
                  <span className="employee-cell-rotate">{m.personName}</span>
                </div>
                {m.schedule.map((s, i) => (
                  <div key={i} className="table-cell">
                    {getScheduleCell(m.persionID, s)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="toolbox">
          <button className="icon-button">EMP</button>
          <button className="icon-button">ANY</button>
          <button
            className="icon-button"
            onClick={() => handleToolboxShiftClick()}
          >
            SFT
          </button>
        </div>

        <ShiftSelectorCard
          isVisible={isVisible}
          closeFunc={() => closeShift()}
          saveFunc={() => setSchedule(schedule)}
          personIndex={selectedPersonIndex}
          dayIndex={shiftDayOfWeek}
          details={shiftDetails}
          schedule={mock}
        />
      </section>
    </main>
  );
};

export default Schedule;
