import React, { Fragment, useState, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChartBar } from "@fortawesome/free-solid-svg-icons";

import { ShiftCard } from "../components/ShiftCard.js";

import "../styles/Schedule.scss";

import config from "../assets/appConfig.json";
import mockSchedule from "../assets/mockSchedule.json";
import personDetails from "../assets/personDetails";
import { endsWith } from "lodash";

const defaultActive = { person: 0, day: 1 };
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
  //data states
  const [schedule, setSchedule] = useState(mockSchedule);
  const [people, setPeople] = useState(personDetails);

  //page states
  const [listView, setListView] = useState(true);
  const [editView, setEditView] = useState(false);
  const [viewView, setViewView] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [dailyShifts, setDailyShifts] = useState([]);
  const [scheduleRange, setScheduleRange] = useState(defaultRange);
  const [dailyViewFilter, setDailyViewFilter] = useState(false);

  //active state controls which cell in table
  const [active, setActive] = useState(defaultActive);

  const handleClickPerson = (i) => {};

  const generateNewSchedule = () => {
    //reset schedule
    let newSchedule = [];
    setSchedule(newSchedule);

    //set controls
    setEditView(true);
    setListView(false);
    setViewView(false);

    newSchedule = people.map((p) => ({
      personId: p.id,
      name: p.firstName + " " + p.lastName,
      schedule: getSchedule(p.available),
    }));

    //finished
    setSchedule(newSchedule);
    // console.log('schedule', schedule)
  };

  const getSchedule = (availArr) => {
    let schedule = [];
    availArr.map((a, i) => {
      let shift = {};
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
      return schedule.push(shift);
    });
    return schedule;
  };

  const calculateDailyShifts = () => {
    
    setDailyShifts([]);
  };

  const updateFullSchedule = (employeeId, employeeSchedule) => {
    const index = schedule.map((object) => object.personId).indexOf(employeeId);
    try{
      schedule[index].schedule = employeeSchedule;
      console.log("schedule", schedule);
      setSchedule(schedule);



      console.log("daily shifts", dailyShifts);
      const mapped = schedule.map((d, i) => {
        return d.schedule;
      });
      console.log("mapped", mapped);
      const merged = [].concat.apply([], mapped);
      console.log("merged", merged);
      const final = merged.filter((m) => m.shifts.length > 0);
      console.log('final', final);
      const dShifts = [{},{},{},{},{},{},{}];

    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <main>
      <section className="schedule-page-header-bar">
        <div className="page-header-title">Schedule</div>
        <div className="page-header-details">
          Schedule Dates : dateFrom - dateTo
        </div>
        <div className="page-header-bar-controls">
          <button className="button" onClick={() => generateNewSchedule()}>
            Generate
          </button>
          <button className="button">Save</button>
          <button className="button">Publish</button>
        </div>
      </section>

      <section>
        <button className="button">
          <FontAwesomeIcon icon={faChartBar} />
        </button>
      </section>

      <section className="main-content">
        {/* list */}
        {listView && (
          <>
            <div className="schedule-list">no current schedules</div>
          </>
        )}

        {/* view */}

        {/* edit */}
        {editView && (
          <>
            {/* future idea */}
            {/* <div className="table-row">Daily Chart Row</div> */}
            {dailyViewFilter && (
              <DailyViewFilterControls scheduleRange={scheduleRange} />
            )}

            <section className="table">
              <TableHeader scheduleDates={scheduleRange} />
              {schedule.map((m, i) => (
                <Fragment key={`${i}-GUID-stuff`}>
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
                  <EmployeeScheduleCells
                    id={m.personId}
                    schedule={m.schedule}
                    updateSchedule={updateFullSchedule}
                  />
                </Fragment>
              ))}
            </section>
          </>
        )}
      </section>
    </main>
  );
};

const TableHeader = ({scheduleDates}) => {
  const dayOfWeekAbbrev = (dayIndex) => {
    return (
      [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ][dayIndex] || ""
    );
  }
  return (
    <>
      <div className="table__header-cell">Person Details</div>
      {scheduleDates.map((d, i) => 
        {
          let day = new Date(d);
          return (
            <div className="table__header-cell" key={`${i}-dates-${d}`}>
              {`${dayOfWeekAbbrev(day.getDay())} ${day.getMonth()}/${day.getDate()}`}
            </div>
          );
        }
      )}
    </>
  );
}

const EmployeeScheduleCells = ({id, schedule, updateSchedule}) => {
  
  const updateEmpSchedule = (shift, section, day) => {
    if (shift === "" && section === ""){
      return
    }
    let newShift = {"shift": shift, "section": section};

    const shiftExists = (s) => {
      return s.shift === shift || s.section === section;
    }
    
    let index = schedule[day].shifts.findIndex(shiftExists) > 0 ?
      schedule[day].shifts.findIndex(shiftExists) :
      0;
    schedule[day].shifts[index] = newShift;
    updateSchedule(id, schedule);
  };

  const getScheduleCell = (id, schedule, ) => {
    if (schedule.available.length >= 1) {
      //TO DO: currently only handles one shift per person per day
      let shift = schedule.shifts.length > 0  ? schedule.shifts[0].shift : '';
      let section = schedule.shifts.length > 0 ? schedule.shifts[0].section : '';
      return (
        <div className="add-shift-cell">
          <ShiftCard update={updateEmpSchedule} shift={shift} section={section} day={schedule.day}/>
        </div>
      );
    } else {
      return <div className="shift-unavailable">UNAVAILABLE</div>;
    }
  };

  return schedule.map((s, i) => (
    <div key={`${id}-${i}`} className="table__cell">
      {getScheduleCell(id, s)}
    </div>
  ));
}

const DailyViewFilterControls = ({ scheduleRange }) => {
  return (
    <section className="mobile__table-header">
      {scheduleRange.map((range, i) => (
        <div className="mobile__table-header-cell" key={`${i}-${range}`}>
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
