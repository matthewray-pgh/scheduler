import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FormFieldButton } from "../components/FormFieldButton.js";
import { ShiftCard } from "../components/ShiftCard.js";
import useSchedulesApi from "../hooks/UseSchedulesApi";
import usePersonAPI from "../hooks/UsePersonApi.js";

import "../styles/Schedule.scss";

// import mockSchedule from "../assets/mockSchedule.json";

export const Schedule = () => {
  const [schedule, setSchedule] = useState({});
  const [shiftDays, setShiftDays] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchSchedule } = useSchedulesApi();
  const { fetchPersonList } = usePersonAPI();

  const urlParams = useParams();

  const fetchData = (id) => {
    setLoading(true);
    const schedulePromise = fetchSchedule(id);
    schedulePromise.then((result) => {
      setSchedule(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(urlParams.id.toString());
    // eslint-disable-next-line
  }, []);

  const handleGenerateShiftsClick = () => {
    const createDateRange = () => {
      let currentDate = new Date(schedule.startdate.replace(/-/g, "/"));
      const endDate = new Date(schedule.enddate.replace(/-/g, "/"));
      let dateRange = [];
      while (currentDate <= endDate){
        dateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateRange;
    }
    const scheduleDates = createDateRange();
    setShiftDays(scheduleDates);

    //populate employees
    fetchPersonList()
      .then((results) => { 
        return results.map(person => {
          return { id: person.id, shifts: scheduleDates };
        })
      }) 
      .then((shiftsResults) => {
        console.log("shifts results", shiftsResults);
        setShifts(shiftsResults);
      })
  };

  const formatDayOfWeekDate = (date) => {
    var options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-us", options);
  }

  return (
    <main className="schedule">
      <section className="schedule__heading--panel">
        <h1>Schedule</h1>
      </section>

      {loading && <h1>Retrieving Schedules ...</h1>}

      {!loading && (
        <div className="schedule__details--panel">
          <h3>Schedule Details</h3>
          <div>
            Dates: {schedule.startdate} - {schedule.enddate}
          </div>
          <div>Name: {schedule.name}</div>
          <div>Description: {schedule.description}</div>
        </div>
      )}

      <section className="schedule__main-content">
        {/* if no shifts exists */}
        {shifts.length === 0 && (
          <div style={{ display: "grid" }}>
            <FormFieldButton
              label="Generate Shifts"
              onClickHandler={handleGenerateShiftsClick}
            />
          </div>
        )}

        {!loading && shifts.length > 0 && (
          <section className="schedule__shifts">
            <div
              className="schedule__shifts--grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${shiftDays.length + 1}, 1fr)`,
              }}
            >
              <div className="schedule__shifts--grid-header"></div>
              {shiftDays.map((days, i) => {
                return (
                  <div className="schedule__shifts--grid-header">
                    {formatDayOfWeekDate(days)}
                  </div>
                );
              })}

              {shifts.map((s, i) => {
                return (
                  <Fragment key={`shift-${s.id}-${i}`}>
                    <div>{s.id}</div>
                    {s.shifts.map((d, shiftIndex) => {
                      return (
                        <div>
                          {/* <div key={`${d}-${shiftIndex}`}>{d.toString()}</div> */}
                          <ShiftCard />
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};