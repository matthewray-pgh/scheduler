import React from "react";

import "../styles/Sections.scss";

const Sections = () => {
  return (
    <main className="sections__main">
      <h1 className="sections__page-heading">Sections</h1>
      <section>
        <p>
          This section will be used to assign sections to a restaurant floor
          plan.
        </p>
        <p>I am planning on using an interactive svg.</p>
        <ul>
          <li>
            initial development will be hard coded floor plan with moveable
            tables and bars.
          </li>
          <li> future would like to have "drawable" floor plan</li>
        </ul>
      </section>
    </main>
  );
};

export default Sections;
