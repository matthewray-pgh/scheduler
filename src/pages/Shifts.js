import React, { useState, useMemo } from "react";

import filter from "lodash/filter";
import max from "lodash/max";

import "../styles/Shifts.scss";
import { repeat } from "lodash";

const Shifts = () => {
  const config = {
    intervals: 24,
    testData: [{ segment: 0, status: 0, start: 0, end: 24 }],
  };

  const test2Data = [
    { segment: 0, status: 0, start: 0, end: 9 },
    { segment: 1, status: 1, start: 10, end: 18 },
    { segment: 2, status: 0, start: 19, end: 24 },
  ];

  const defaultOptions = Array.from(
    Array(config.intervals).fill(`${config.intervals}:00`)
  );

  const defaultZeros = Array.from(Array(config.intervals).fill(0));
  const [intervals, setIntervals] = useState(defaultZeros);

  const [shiftTimes, setShiftTimes] = useState([
    "00:00",
    "01:00",
    "02:00",
    "03:00",
  ]);

  const [startShift, setStartShift] = useState(0);
  const [endShift, setEndShift] = useState(0);
  const [error, setError] = useState(false);

  const cellStyle = (value) => {
    return value === 1 ? "rgba(255, 0, 0, 0.85)" : "rgba(0, 0, 0, 0)";
  };

  const rowStyle = useMemo(() => {
    const rowArray = [];
    intervals.map((d, i) => {
      if (d === 0) {
        rowArray.push(d);
      } else if (rowArray[i] !== rowArray[i - 1]) {
        rowArray.push(d);
      }
    });
    console.log(rowArray);
    return rowArray;
  }, [intervals]);

  const shiftStyle = useMemo(() => {
    let currentIndex = 0;
    let current = intervals[currentIndex];
    let answer = "";
    intervals.map((d, i) => {
      if (current !== d || i === intervals.length - 1) {
        const length =
          i === intervals.length - 1 ? i - currentIndex + 1 : i - currentIndex;
        const style = current === 0 ? `repeat(${length}, 1fr)` : `${length}fr`;
        answer = `${answer} ${style}`;
        current = d;
        currentIndex = i;
      }
    });
    return answer;
  }, [intervals]);

  const handleCurrentStartChange = (e) => {
    setStartShift(e.target.value);
  };

  const handleCurrentEndChange = (e) => {
    setEndShift(e.target.value);
  };

  const handleClick = () => {
    // console.log(`${endShift} < ${startShift} : ${endShift < startShift}`);
    // if (endShift < startShift) {
    //   setError(true);
    //   return;
    // }
    let tempShift = intervals.map((d, i) => {
      return i >= startShift && i <= endShift ? 1 : 0;
    });
    setIntervals(tempShift);
    setError(false);
  };

  const handleReset = () => {
    setStartShift(0);
    setEndShift(0);
    setIntervals(Array.from(Array(config.intervals).fill(0)));
    setError(false);
  };

  return (
    <main className="shifts__main">
      <h1>Shifts</h1>
      <section className="shifts__content">
        <form>
          <select className="input-number">
            <option value={0}>--</option>
            <option value={1}>working</option>
          </select>
          <input
            type="number"
            className="input-number"
            min={0}
            max={config.intervals}
            value={startShift}
            onChange={handleCurrentStartChange}
          />
          <input
            type="number"
            className="input-number"
            min={0}
            max={config.intervals}
            value={endShift}
            onChange={handleCurrentEndChange}
          />

          <button type="button" className="button-submit" onClick={handleClick}>
            submit
          </button>

          <button type="button" className="button" onClick={handleReset}>
            reset
          </button>
        </form>

        <div className={error ? "error-content--show" : "error-content--hide"}>
          <span className="error-message">error with form data</span>
        </div>

        <div
          className="shifts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${config.intervals}, 1fr)`,
          }}
        >
          {intervals.map((d, i) => {
            return (
              <div
                key={`${d}-cell-${i}`}
                className="cell-empty"
                style={{ backgroundColor: cellStyle(d) }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Shifts;
