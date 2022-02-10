import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "../components/Header.js";

import concat from "lodash/concat";
import filter from "lodash/filter";
import head from "lodash/head";
import last from "lodash/last";
import map from "lodash/map";
import max from "lodash/max";
import min from "lodash/min";

import "../styles/DailySchedule.scss";

export const DailySchedule = () => {
  const configStatus = [
    {
      id: 0,
      name: "work",
      type: "work",
      primary: "rgba(36, 139, 8, 1)",
      secondary: "rgba(36, 139, 88, 0.75)",
    },
    {
      id: 1,
      name: "request off",
      type: "requestOff",
      primary: "rgba(211, 131, 11, 1)",
      secondary: "rgba(223, 138, 11, 0.75)",
    },
    {
      id: 2,
      name: "not available",
      type: "notAvailable",
      primary: "rgba(100, 102, 105, 1)",
      secondary: "rgba(100, 102, 105, 0.75)",
    },
    {
      id: 3,
      name: "other",
      type: "other",
      primary: "rgba(12, 70, 158, 1)",
      secondary: "rgba(32, 93, 184, 0.75)",
    },
  ];

  const segments = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const groupings = [1, 2, 3, 4, 5, 6, 7];

  const template = {
    type: null,
    group: null,
    range: [],
    start: null,
    end: null,
  };
  const template2 = {
    type: "work",
    group: 2,
    segments: [8, 9, 10, 11, 12, 13, 14],
    start: 8,
    end: 14,
  };
  const template3 = {
    type: "work",
    group: 2,
    segments: [1, 2, 3, 4],
    start: 1,
    end: 4,
  };

  const intialWeek = useMemo(() => {
    let schedule = [];
    for (let i = 0; i < groupings.length; i++) {
      let s = [];
      for (let j = 0; j < segments.length; j++) {
        s.push(template);
      }
      schedule.push(s);
    }
    return schedule;
  }, [groupings, segments, template]);

  const tempData = [template, template2, template3];

  const [intervals, setIntervals] = useState(segments);
  const [days, setDays] = useState(groupings);
  const [focus, setFocus] = useState(null);
  const [status, setStatus] = useState("work");
  const [data, setData] = useState(intialWeek);

  useEffect(() => {
    console.log("effect - focus", focus);
  });

  const displayStatus = (row, column) => {
    let segment = data[row][column];
    if (segment.type) {
      let style = filter(configStatus, { type: segment.type });
      return { backgroundColor: style[0].secondary };
    } else {
      return { backgroundColor: "rgb(255,255,255)" };
    }
  };

  const updateStatus = (status, id) => {
    setStatus(status);
  };

  const handleClick = (row, column) => {
    setFocus({ x: row, y: column });
    let copy = data;
    let template = {
      type: copy[row][column].type === status ? null : status,
      group: row,
      segments: [],
      start: column,
      end: null,
    };

    //fill range tool
    // let a = filter(copy[row], { type: status });
    // let b = map(a, (d) => {
    //   return d.start;
    // });

    // let minNum = min(b);
    // let maxNum = max(b);

    // let start = column < maxNum ? column : maxNum;
    // let end = start === maxNum ? column : maxNum;

    // for (let i = start; i <= end; i++) {
    //   template = {
    //     type: copy[row][i].type === status ? null : status,
    //     group: row,
    //     segments: [],
    //     start: i,
    //     end: null,
    //   };
    //   copy[row][i] = template;
    // }

    copy[row][column] = template;
    setData(copy);
  };

  return (
    <main>
      <Header />
      <header className="daily-header">Daily Schedule Availability</header>

      <section
        className="daily-status-controls"
        data-testid="daily-status-controls"
      >
        {configStatus.map((configStat, i) => {
          const statusStyle =
            status === configStat.type
              ? {
                  backgroundColor: configStat.secondary,
                  color: "rgb(255,255,255)",
                }
              : {
                  backgroundColor: "rgb(255,255,255)",
                  color: "rgb(0,0,0)",
                };
          return (
            <div
              className="daily-status-control__button"
              style={statusStyle}
              onClick={() => updateStatus(configStat.type, configStat.id)}
              key={`daily-status-control-button-${i}`}
            >
              <span
                style={{
                  backgroundColor: configStat.secondary,
                  borderRightColor: configStat.primary,
                  borderRightStyle: "solid",
                  borderRightWidth: "5px",
                }}
              ></span>
              <span className="daily-status-control__button--text">
                {configStat.name}
              </span>
            </div>
          );
        })}
      </section>

      <section className="daily-grid" data-testid="daily-grid">
        <div
          className="daily-grid__header"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat( ${segments.length}, 1fr)`,
          }}
        >
          {segments.map((d, i) => {
            return (
              <div key={`header-cell-${i}`} className="daily-grid__header-cell">
                {d}
              </div>
            );
          })}
        </div>
        <div
          className="daily-grid__table-body"
          data-testid="daily-grid__table-body"
        >
          {days.map((day, dayIndex) => {
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat( ${intervals.length}, 1fr)`,
                }}
                className="daily-grid__table-row"
                key={`daily-grid__table-row-${dayIndex}`}
              >
                {intervals.map((interval, intervalIndex) => {
                  return (
                    <div
                      className="daily-grid__table-cell"
                      style={displayStatus(dayIndex, intervalIndex)}
                      onClick={() => handleClick(dayIndex, intervalIndex)}
                      key={`daily-grid__table-cell-${intervalIndex}`}
                    >
                      {dayIndex}
                      <br />
                      {intervalIndex}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* <div data-testid="current-focus-text">
          {focus && (
            <p>
              current focus: [{focus.x}]:[{focus.y}]
            </p>
          )}
        </div> */}

        <section className="daily-grid-form">
          <div className="daily-grid-form__input-group">
            <label htmlFor="" className="daily-grid-form__input-label">
              group
            </label>
            <input
              type="text"
              className="daily-grid-form__input"
              value={focus && focus.x}
            ></input>
          </div>
          <div className="daily-grid-form__input-group">
            <label htmlFor="" className="daily-grid-form__input-label">
              start
            </label>
            <input
              type="text"
              className="daily-grid-form__input"
              value={focus && focus.y}
            ></input>
          </div>
          <div className="daily-grid-form__input-group">
            <label htmlFor="" className="daily-grid-form__input-label">
              end
            </label>
            <input type="text" className="daily-grid-form__input"></input>
          </div>
          <div className="daily-grid-form__input-group">
            <label htmlFor="" className="daily-grid-form__input-label">
              length
            </label>
            <input type="text" className="daily-grid-form__input"></input>
          </div>
          <button className="daily-grid-form__button">save</button>
          <button className="daily-grid-form__button">reset</button>
        </section>
      </section>
    </main>
  );
};
