import React from "react";

import appConfig from "../assets/appConfig.json";

const ShiftTextTranslator = (val) => {
  const findShiftById = (arr) => {
    const status = arr.find((o) => o.id === val.val);
    return status.abbrev;
  };

  return <label>{findShiftById(appConfig[0].shiftStatus)}</label>;
};

export default ShiftTextTranslator;
