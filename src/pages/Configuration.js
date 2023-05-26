import React, { Fragment, useState } from "react";
import { ToggleSwitch } from "../components/ToggleSwitch";

import "../styles/Configuration.scss";

export const Configuration = () => {
  const [days, setDays] = useState([
    { day: "Sunday", active: false, open: null, close: null },
    { day: "Monday", active: false, open: null, close: null },
    { day: "Tuesday", active: false, open: null, close: null },
    { day: "Wednesday", active: false, open: null, close: null },
    { day: "Thursday", active: false, open: null, close: null },
    { day: "Friday", active: false, open: null, close: null },
    { day: "Saturday", active: false, open: null, close: null },
  ]);
  
  const handleToggleChange = (day) => {
    const currentDayIndex = days.findIndex((d) => d.day === day);
    const updatedDays = {...days[currentDayIndex], active: !days[currentDayIndex].active};
    const newDays = [...days];
    newDays[currentDayIndex] = updatedDays;
    setDays(newDays);
  };

  return (
    <main className="configuration">
      <h1>Settings</h1>
      
      <ConfigCard title="Days of Operation">
        <div className="confiiguration__shifts-daily">
          <div className="configuration__shifts-daily--toggle">
            {/* TODO: add master daily toggle */}
            {/* <ToggleSwitch label="All Week" handleChange={handleToggleAllChange} />
            <hr /> */}
            {days.map((d ,i) => {
              return (
                <Fragment key={`${i}-${d.day}`}>
                  <ToggleSwitch
                    label={d.day}
                    handleChange={() => handleToggleChange(d.day)}
                  />
                  {d.active && <HoursOfOperation />}
                </Fragment>
              );
            }
            )}
          </div>
        </div>
      </ConfigCard>

      <ConfigCard title="Job Types">
        <div className="configuration__jobs"></div>
      </ConfigCard>
    </main>
  );
};

export const ConfigCard = ({title, children}) => {
  return (
    <section className="configuration__card">
      <h2>{title}</h2>
      <div className="configuration__card--content">{children}</div>
    </section>
  );
};

export const HoursOfOperation = () => {
  return (
    <section className="hours-of-operation">
      <h2>Hours of Operation</h2>
      <div>Open</div>
      <div>Close</div>
    </section>
  );
};