import React, { Fragment, useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

import usePersonAPI from "../hooks/UsePersonApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faPlus,
  faTrashAlt,
  faPencilAlt,
  faThList,
  faTh
} from "@fortawesome/free-solid-svg-icons";

import "../styles/People.scss";

// TODO: POSITION TAGS hook
// import positionData from "../assets/positionsAPI.json";
// import find from "lodash/find";

import {
  IconButton,
  ListButton,
} from "../components/FormFieldButton.js";

export const People = () => {
  const [data, setData] = useState([]);

  const { 
    fetchPersonList, 
    deleteCurrentPerson 
  } = usePersonAPI();

  useEffect(() => {
    getPersons();
    // eslint-disable-next-line
  }, []);

  const getPersons = () => {
    fetchPersonList().then((persons) => setData(persons));
  }

  const handleDeletePerson = async (id) => {
    if (!id) return;
    deleteCurrentPerson(id)
      .then((result) => {
        if(result.id){
          getPersons();
        }
        else{
          console.error("TODO: Display error on screen");
        }
      });
  };

  const getPositionName = (id) => {
    // const data = find(positionData, ["id", parseInt(id)]);
    return (
      <>
        {/* <span className="people__position people__position--server">
          server
        </span>
        <span className="people__position people__position--bartender">
          bartender
        </span>
        <span className="people__position people__position--hostess">
          hostess
        </span> */}
        <span className="people__position">unassigned</span>
      </>
    );
    // return data ? data.name : "unassigned";
  };

  const handleEditClick = (person) => {
    // setForm(person);
  };

  return (
    <main className="people__page">
      <div className="people__title">
        <h1>People</h1>
        <div className="people__title--button-container">
          <Link to={`/people/new`}>
            <IconButton icon={faPlus} label="add person" />
          </Link>
        </div>
      </div>

      <section className="people__header">
        <IconButton icon={faThList} label="list" />
        <IconButton icon={faTh} label="grid" />
      </section>

      <section className="people__main-content">
        <section className="people__list-content">
          <div className="people__table people__table--header">
            <div>Person</div>
            <div>Position(s)</div>
            <div>Date(s)</div>
            <div className="people__table--header--span">Actions</div>
          </div>

          <div className="people__table">
            {data.map((d, i) => {
              return (
                <Fragment key={i}>
                  <div className="people__table--id-card">
                    <FontAwesomeIcon
                      className="people__table--id-card--icon"
                      icon={faUserCircle}
                    />
                    <div>
                      <div className="people__table--id-card--bold">
                        {d.firstname} {d.lastname}
                      </div>
                      <div>{d.email}</div>
                    </div>
                  </div>

                  <span className="people__table--positions">
                    {getPositionName(d.position)}
                  </span>
                  <span className="people__table--cell">{d.hiredate}</span>
                  <span className="people__table--cell">
                    <Link to={`/people/${d.id}`}>
                      <ListButton
                        onClickHandler={() => handleEditClick(d)}
                        icon={faPencilAlt}
                      />
                    </Link>
                  </span>
                  <span className="people__table--cell">
                    <ListButton
                      onClickHandler={() => handleDeletePerson(d.id)}
                      icon={faTrashAlt}
                    />
                  </span>
                </Fragment>
              );
            })}
          </div>

          {data && data.length === 0 && (
            <div className="people__table--row-empty">
              <span>no results</span>
              <div></div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};