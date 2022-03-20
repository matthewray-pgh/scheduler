import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faPlusSquare,
  faFilter,
  faPen,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/People.scss";

import personData from "../assets/personDetails.json";
import positionData from "../assets/positionsAPI.json";

import find from "lodash/find";

import {
  FormFieldText,
  FormFieldEmail,
  FormFieldPhone,
  FormFieldDate,
} from "../components/FormFields.js";
import FormFieldButton from "../components/FormFieldButton.js";

function People() {
  const [data, setData] = useState(personData);
  const [current, setCurrent] = useState({
    lastName: null,
    firstName: null,
    email: null,
    hireDate: null,
  });

  const [personDetails, setPersonDetails] = useState(false);

  const confirmColor = "#06a94d";

  // const getPositionFakeAPI = (id) => {
  //   setTimeout(() => {
  //     const positionObj = find(positionData, ["id", id]);
  //     console.log("positionObj", positionObj);
  //   }, 2000);
  // };

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
    if (personDetails !== true) {
      setPersonDetails(true);
    }
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
    setPersonDetails(false);
  };

  const handleAddClick = () => {
    setPersonDetails(true);
  };

  const handleFilterClick = () => {
    console.log("handle filter click -- temporary");
  };

  return (
    <main className="people__page">
      <section className="people__header-bar">
        <div className="people__header-title">People</div>
        <div className="people__header-details"></div>
      </section>

      <section className="people__data-controls">
        <div className="people__data-controls--search-bar">
          <input
            className="people__data-controls--search-input"
            placeholder="Search People"
            type="text"
          ></input>
          <button
            className="people__data-controls--search-button"
            type="button"
          >
            <FontAwesomeIcon
              className="people__data-control--button-icon"
              icon={faSearch}
            />
          </button>
        </div>
        <div className="people__data-controls--filters">
          <span className="people__data-controls--results">
            Showing {data.length} of {data.length} results
          </span>
          <button
            className="people__header-control-button"
            onClick={handleFilterClick}
          >
            <FontAwesomeIcon
              className="people__header-control-button--icon"
              icon={faFilter}
            />
            <span>FILTER LIST</span>
          </button>

          <button
            className="people__header-control-button"
            onClick={handleAddClick}
          >
            <FontAwesomeIcon
              className="people__header-control-button--icon"
              icon={faPlusSquare}
            />
            <span>ADD PERSON</span>
          </button>
        </div>
      </section>

      <section className="people__main-content">
        <section className="people__list-content">
          <div className="people__table">
            <div className="people__table-row-header">
              <span>person</span>
              <span>position(s)</span>
              <span>hire date</span>
              <span>active</span>
              <span>actions</span>
            </div>
            {data.map((d, i) => {
              return (
                <div
                  className="people__table-row"
                  key={i}
                  onClick={() => handleRowClick(d)}
                >
                  <div className="people__table__id-card">
                    <FontAwesomeIcon
                      className="people__table__id-card--icon"
                      icon={faUserCircle}
                    />
                    <div>
                      <div className="people__table__id-card--bold">
                        {d.firstName} {d.lastName}
                      </div>
                      <div>{d.email}</div>
                    </div>
                  </div>

                  <span>
                    {getPositionName(d.position)}
                    {d.Position}
                  </span>
                  <span>{d.hireDate}</span>
                  <span>{d.active}</span>
                  <span>
                    <FontAwesomeIcon className="" icon={faPen} />
                    <FontAwesomeIcon className="" icon={faTrash} />
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          className={
            personDetails ? "people__details" : "people__details--hide"
          }
        >
          <div className="">DETAILS</div>
          <FormFieldText label="first name" value={current.firstName} />
          <FormFieldText label="last name" value={current.lastName} />
          <FormFieldEmail label="email" value={current.email} />
          <FormFieldDate label="hire date" value={current.hireDate} />
          <FormFieldDate label="term date" value={current.termDate} />
          <FormFieldPhone label="phone" value={current.contact} />
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
