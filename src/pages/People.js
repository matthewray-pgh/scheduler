import React, { useState } from "react";
import Header from "../components/Header.js";

import "../styles/People.scss";

import personData from "../assets/personDetails.json";
import positionData from "../assets/positionsAPI.json";

import find from "lodash/find";

import FormFieldText from "../components/FormFieldText.js";
import FormFieldButton from "../components/FormFieldButton.js";
import FormFieldCheckboxes from "../components/FormFieldCheckboxes.js";

function People() {
  const [data, setData] = useState(personData);
  const [current, setCurrent] = useState({
    lastName: null,
    firstName: null,
    email: null,
    hireDate: null,
  });

  const confirmColor = "#06a94d";

  const getPositionFakeAPI = (id) => {
    setTimeout(() => {
      const positionObj = find(positionData, ["id", id]);
      console.log("positionObj", positionObj);
    }, 2000);
  };

  const getPositionName = (id) => {
    const data = find(positionData, ["id", parseInt(id)]);
    return data ? data.name : "unassigned";
  };

  const handleRowClick = (person) => {
    console.log("person", person);
    setCurrent({
      lastName: person.lastName,
      firstName: person.firstName,
      email: person.email,
      hireData: person.hireData,
    });
  };

  const handleSubmit = () => {
    console.log("submit button was clicked!");
  };

  const handleCancel = () => {
    setCurrent({
      lastName: null,
      firstName: null,
      email: null,
      hireDate: null,
    });
  };

  return (
    <main>
      <Header />
      <section className="page-header-bar">
        <div className="page-header-title">People</div>
        <div className="page-header-details"></div>
      </section>

      <section className="people-main-content">
        <section className="people-sub-content">
          <div className="person-table">
            <div className="person-table-row-header">
              <span>name</span>
              <span>email</span>
              <span>position(s)</span>
              <span>hire date</span>
              <span>active</span>
            </div>
            {data.map((d, i) => {
              return (
                <div
                  className="person-table-row"
                  key={i}
                  onClick={() => handleRowClick(d)}
                >
                  <span>
                    {d.firstName} {d.lastName}
                  </span>
                  <span>{d.email}</span>
                  <span>
                    {getPositionName(d.position)}
                    {d.Position}
                  </span>
                  <span>{d.hireDate}</span>
                  <span>{d.active}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="people-sub-content">
          <div>add/edit employee</div>
          <FormFieldText label="first name" value={current.firstName} />
          <FormFieldText label="last name" value={current.lastName} />
          <FormFieldText label="email" value={current.email} />
          <FormFieldText label="hire date" value={current.hireDate} />
          <FormFieldCheckboxes label="positions" options={positionData} />
          <FormFieldButton
            label="submit"
            color={confirmColor}
            onClickHandler={handleSubmit}
          />
          <FormFieldButton label="cancel" onClickHandler={handleCancel} />
        </section>
      </section>
    </main>
  );
}

export default People;
