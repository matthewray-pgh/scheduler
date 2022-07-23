import React, { useEffect, useRef } from "react";
import { select } from "d3-selection";

export const Grid = ({
  xScale,
  yScale,
  xAxisTicks,
  yAxisTicks,
  height,
  width,
  top,
  left,
  gridColor,
}) => {
  const gGrid = useRef();

  useEffect(() => {
    select(gGrid.current).selectAll("line").remove();

    select(gGrid.current)
      .selectAll("line.horizontal")
      .data(yAxisTicks)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", yScale)
      .attr("y2", yScale)
      .attr("fill", "none")
      .attr("stroke", gridColor)
      .attr("strokeWidth", 1)
      .attr("pointerEvents", "none");

    select(gGrid.current)
      .selectAll("line.vertical")
      .data(xAxisTicks)
      .enter()
      .append("line")
      .attr("x1", xScale)
      .attr("x2", xScale)
      .attr("y1", top)
      .attr("y2", height)
      .attr("fill", "none")
      .attr("stroke", gridColor)
      .attr("strokeWidth", 1)
      .attr("pointerEvents", "none");

    select(gGrid.current)
      .selectAll("line.vertical")
      .data(xAxisTicks)
      .enter()
      .append("line")
      .attr("x1", 1)
      .attr("x2", 1)
      .attr("y1", top)
      .attr("y2", height)
      .attr("fill", "none")
      .attr("stroke", gridColor)
      .attr("strokeWidth", 1)
      .attr("pointerEvents", "none");

    select(gGrid.current)
      .selectAll("line.vertical")
      .data(xAxisTicks)
      .enter()
      .append("line")
      .attr("x1", width)
      .attr("x2", width)
      .attr("y1", top)
      .attr("y2", height)
      .attr("fill", "none")
      .attr("stroke", gridColor)
      .attr("strokeWidth", 1)
      .attr("pointerEvents", "none");
  });

  return (
    <g
      className="grid"
      data-testid="grid"
      ref={gGrid}
      transform={`translate(${left}, 0)`}
    />
  );
};

Grid.defaultProps = {
  top: 0,
  left: 0,
  gridColor: "#dedede",
};
