import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";

import { FormFieldButton } from "../components/FormFieldButton.js";
import { ShiftCard } from "../components/ShiftCard.js";
import { HeaderSummary } from "../components/HeaderDetails/HeaderDetails.jsx";
import useSchedulesApi from "../hooks/UseSchedulesApi.js";
import usePersonAPI from "../hooks/UsePersonApi.js";

import "../styles/Schedule.scss";

export const ScheduleForm = () => {
  const [schedule, setSchedule] = useState({});
  const [summary, setSummary] = useState({});
  const [shiftDays, setShiftDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchSchedule } = useSchedulesApi();
  const { fetchPersonList } = usePersonAPI();

  const urlParams = useParams();

  const fetchData = (id) => {
    setLoading(true);
    const schedulePromise = fetchSchedule(id);
    schedulePromise.then((result) => {
      setSummary(result);
      setLoading(false);
    });
  };

  const fetchPersonData = () => {
    fetchPersonList().then((results) => {
      if (results !== undefined && results.length > 0) {
        const initialShifts = results.map((res, i) => {
          return {
            id: i,
            scheduleId: urlParams.id,
            personId: res.id,
            name: `${res.firstname} ${res.lastname}`,
            shifts: res.schedule,
          };
        });
        setSchedule(initialShifts);
      };
    });
  };

  useEffect(() => {
    fetchData(urlParams.id.toString());
    fetchPersonData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    const getDates = (start, stop) => {
      let dateArray = [];
      let currentDate = start;
      while (currentDate <= stop) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    };

    if (summary.startdate && summary.enddate) {
      const start = summary.startdate.split("-");
      const rangeStart = new Date(start[0], start[1] - 1, start[2]);

      const end = summary.enddate.split("-");
      const rangeEnd = new Date(end[0], end[1] - 1, end[2]);

      const range = getDates(rangeStart, rangeEnd);
      setShiftDays(range);
    }
  }, [summary]);

  const handleBlockClick = (day, person) => {
    console.log(`day: ${day}, person: ${person}`);
  }

  return (
    <main className="schedule">
      {loading && <h1>Retrieving Schedules ...</h1>}

      {!loading && (
        <HeaderSummary 
          icon={faBusinessTime}
          title={summary.name ? summary.name : "Name"}
          line1={summary.description ? summary.description : "Description"}
          line2={summary.startdate ? `${summary.startdate} to ${summary.enddate}` : "Start Date - End Date"}
        />
      )}

      <section
        className="schedule__content"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${shiftDays.length + 1}, 1fr)`,
          gridGap: "3px",
        }}
      >
        <div className="schedule__content--header"></div>
        {shiftDays.length > 0 &&
          shiftDays.map((day, i) => {
            return (
              <div className="schedule__content--heading" key={`${i}-${day}`}>
                {day.getMonth() + 1}/{day.getDate()}
              </div>
            );
          })}

        {schedule.length > 0 &&
          schedule.map((sch, i) => {
            return (
              <React.Fragment key={`${i}-${sch.scheduleId}-${sch.personId}`}>
                <div className="schedule__block--name">
                  {sch.name ? sch.name : "unlisted"}
                </div>
                {sch.shifts.length > 0 &&
                  sch.shifts.map((day, dayIndex) => {
                    return (
                      <div
                        key={`${dayIndex}-${day}`}
                        className={
                          day ? "schedule__block" : "schedule__unavailable"
                        }
                        onClick={() => handleBlockClick(day, `${sch.name}`)}
                      >
                        {day ? "" : "unavailable"}
                      </div>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </section>
    </main>
  );
};