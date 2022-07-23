import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { ShiftCard } from "../components/ShiftCard.js";
import { useWindow } from "../components/UseWindow";

import "../styles/Schedule.scss";

import testData from "../assets/dataFile.json";
import config from "../assets/appConfig.json";
import shiftDefaults from "../assets/scheduleTemplate.json";
import mockSchedule from "../assets/mockSchedule.json";
import personDetails from "../assets/personDetails";

const defaultActive = { person: 0, day: 1 };
const mobileWidth = 600;
const defaultRange = [
  new Date("07-17-22"),
  new Date("07-18-22"),
  new Date("07-19-22"),
  new Date("07-20-22"),
  new Date("07-21-22"),
  new Date("07-22-22"),
  new Date("07-23-22"),
];

export const Schedule = () => {
  const [schedule, setSchedule] = useState(testData);
  const [mock, setMock] = useState(mockSchedule);
  const [people, setPeople] = useState(personDetails);

  const [scheduleRange, setScheduleRange] = useState(defaultRange);
  const [dailyViewFilter, setDailyViewFilter] = useState(false);

  //active state controls which cell in table
  const [active, setActive] = useState(defaultActive);

  const isMobile = useWindow(mobileWidth);
  console.log("isMobile", isMobile);

  console.log("schedule", schedule);

  const [shiftDetails, setShiftDetails] = useState({
    day: shiftDefaults.day,
    shift: shiftDefaults.shift,
    start: shiftDefaults.start,
    section: shiftDefaults.section,
  });

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
  };

  const handleClickPerson = (i) => {};

  const getScheduleCell = (id, schedule) => {
    if (schedule.available.length >= 1) {
      return (
        <div
          className="schedule-cell"
          onClick={() => handleClickShift(id, schedule)}
        >
          <ShiftCard />
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
        {/* future idea */}
        {/* <div className="table-row">Daily Chart Row</div> */}
        {dailyViewFilter && (
          <DailyViewFilterControls scheduleRange={scheduleRange} />
        )}

        <section className="table">
          {/* people information */}
          <div className="table__people">
            <div className="table__header-cell"></div>
            {mock.map((m, i) => (
              <div
                key={`${i}-employee`}
                className="table__cell"
                onClick={() => handleClickPerson(m.personId)}
              >
                <EmployeeCard
                  name={m.name}
                  contact={"contact info"}
                  image={null}
                />
              </div>
            ))}
          </div>

          {/* shift information */}
          <div className="table__shifts">
            {scheduleRange.map((range, i) => (
              <div className="table__header-cell" key={`${i}-${range}`}>
                {range.toLocaleDateString("en-us", {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
            ))}

            {mock.map((m, i) =>
              m.schedule.map((s, i) => (
                <div key={i} className="table__cell">
                  {getScheduleCell(m.persionID, s)}
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

const DailyViewFilterControls = ({ scheduleRange }) => {
  return (
    <section className="mobile__table-header">
      {scheduleRange.map((range, i) => (
        <div className="mobile__table-header-cell">
          <div>
            {range.toLocaleDateString("en-us", {
              weekday: "short",
            })}
          </div>
          <div>
            {range.toLocaleDateString("en-us", {
              month: "numeric",
              day: "numeric",
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

const EmployeeCard = ({ name, contact, image }) => {
  return (
    <section className="employee-card">
      <div className="employee-card__icon">
        {image ? (
          <img alt="person" src="image" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className="employee-card__details">
        <div>{name}</div>
        <div>{contact}</div>
      </div>
    </section>
  );
};
