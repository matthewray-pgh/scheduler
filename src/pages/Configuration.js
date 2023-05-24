import React, { useState } from "react";
import { ToggleSwitch } from "../components/ToggleSwitch";

import "../styles/Configuration.scss";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const Configuration = () => {
  const [days, setDays] = useState([]);
  
  const handleToggleChange = (e) => {
    console.log(e.target.checked);
  };

  const handleToggleAllChange = (e) => {
    console.log(e.target.checked);
  };

  return (
    <main className="configuration">
      <h1>Settings</h1>
      
      <ConfigCard title="Days of Operation">
        <div className="confiiguration__shifts-daily">
          <div className="configuration__shifts-daily--toggle">
            <ToggleSwitch label="All Week" handleChange={handleToggleAllChange} />
            <hr />
            <ToggleSwitch label="Sunday" handleChange={handleToggleChange} />
            <ToggleSwitch label="Monday" handleChange={handleToggleChange} />
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