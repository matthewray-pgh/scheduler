import React, { useState } from "react";

import { SideNav } from "../components/SideNav";
import "../styles/Shifts.scss";

const Shifts = () => {
  const config = {
    intervals: 10,
  };
  const [intervals, setIntervals] = useState(
    Array.from(Array(config.intervals).fill(0))
  );

  // let rowStyle = () => {
  //   const cells =
  //   return {gridTemplateColumn: cells}
  // }

  return (
    <main className="shifts-main">
      <SideNav />
      <section>
        <h1>Shifts</h1>
        <section>
          <div className="shifts-grid-row" style={{}}>
            {intervals.map((d, i) => {
              return (
                <div>
                  {d}-{i}
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Shifts;
