import React, { useState, useMemo, useEffect } from "react";

import { scaleLinear } from "d3-scale";

import "../styles/Sections.scss";

import { FormFieldText } from "../components/FormFields";
import { FormFieldButton } from "../components/FormFieldButton";
import { Grid } from "../components/charts/Grid";

export const Sections = () => {
  const [unit, setUnit] = useState(1);
  const [floorWidth, setFloorWidth] = useState(100);
  const [floorLength, setFloorLength] = useState(50);

  const width = floorWidth * (unit * 10);
  const height = floorLength * (unit * 10);

  const section = [
    {
      start: { x: 100, y: 0 },
      end: { x: 200, y: 100 },
      id: "0",
      name: "section 1",
      color: "#1A2B3C",
      stroke: unit * 2,
    },
    {
      start: { x: 300, y: 0 },
      end: { x: 300, y: 300 },
      id: "1",
      name: "section 2",
      color: "#f00f00",
      stroke: unit * 2,
    },
  ];

  const handleFloorWidthChange = (event) => {
    return setFloorWidth(event.target.value);
  };

  const handleFloorLengthChange = (event) => {
    return setFloorLength(event.target.value);
  };

  const handleUnitChange = (event) => {
    return setUnit(event.target.value);
  };

  let xAxisData = Array.from({ length: floorWidth }, (x, i) => i);
  let yAxisData = Array.from({ length: floorLength }, (x, i) => i);

  const handleSave = () => {
    xAxisData = [...Array(floorWidth).keys()];
    yAxisData = [...Array(floorLength).keys()];
  };

  const xScale = useMemo(() => {
    return scaleLinear().domain([0, floorWidth]).range([width, 0]);
  }, [floorWidth, width]);

  const yScale = useMemo(() => {
    return scaleLinear().domain([0, floorLength]).range([height, 0]);
  }, [floorLength, height]);

  const sectionColor = "#546546";

  useEffect(() => {
    console.log(
      `yAxisData: ${yAxisData.length}, xAxisData: ${xAxisData.length}`
    );
  }, [yAxisData, xAxisData]);

  return (
    <main className="sections__main">
      <h1 className="sections__page-heading">Sections</h1>
      <section className="sections">
        <div className="sections__toolbar">
          <FormFieldText
            label="units"
            value={unit}
            onChange={handleUnitChange}
          />
          <FormFieldText
            label="length"
            value={floorLength}
            onChange={handleFloorLengthChange}
          />
          <FormFieldText
            label="width"
            value={floorWidth}
            onChange={handleFloorWidthChange}
          />
          <FormFieldButton label="save" onClickHandler={handleSave} />
        </div>
        <section
          className="sections__container"
          data-testid="sections-container"
        >
          <div className="sections__floorplan" data-testid="sections-floorplan">
            <svg width={width} height={height}>
              {/* grid component */}
              <Grid
                xScale={xScale}
                yScale={yScale}
                xAxisTicks={xAxisData}
                yAxisTicks={yAxisData}
                height={height}
                width={width}
              />

              {/* tables & walls */}

              {/* sections */}

              <rect
                x={0}
                y={0}
                width={100}
                height={100}
                stroke={sectionColor}
                strokeWidth={2}
                fill={sectionColor}
                fillOpacity={0.25}
              />

              {section.map((d, i) => {
                return (
                  <rect
                    key={`section-${i}-${d.name}`}
                    x={d.start.x}
                    y={d.start.y}
                    width={d.end.x}
                    height={d.end.y}
                    stroke={d.color}
                    strokeWidth={d.stroke}
                    fill={d.color}
                    fillOpacity={0.25}
                  />
                );
              })}
            </svg>
          </div>
          <div className="sections__list" data-testid="sections-list">
            {section.map((d, i) => {
              return (
                <div key={`section-${i}-${d.name}`} style={{ color: d.color }}>
                  {d.name} : {d.id}
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
};
