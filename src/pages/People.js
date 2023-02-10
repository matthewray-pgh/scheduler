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
  const [listView, setListView] = useState(true);
  const [gridView, setGridView] = useState(false);

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

  const handleListViewClick = () => {
    setListView(true);
    setGridView(false);
  };

  const handleGridViewClick = () => {
    setListView(false);
    setGridView(true);
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
        <IconButton
          icon={faThList}
          label="list"
          onClickHandler={handleListViewClick}
          className={listView ? "icon-button-active" : "icon-button"}
        />
        <IconButton
          icon={faTh}
          label="grid"
          onClickHandler={handleGridViewClick}
          className={gridView ? "icon-button-active" : "icon-button"}
        />
      </section>

      <section className="people__main-content">
        <ListView
          data={data}
          showList={listView}
          getPositionName={getPositionName}
          handleDeletePerson={handleDeletePerson}
        />

        <GridView
          data={data}
          showGrid={gridView}
          getPositionName={getPositionName}
          handleDeletePerson={handleDeletePerson}
        />

        {data && data.length === 0 && (
          <div className="people__table--row-empty">
            <span>no results</span>
            <div></div>
          </div>
        )}
      </section>
    </main>
  );
};

const ListView = ({
  data,
  showList,
  getPositionName,
  handleDeletePerson,
}) => {
  return (
    showList && 
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
                <PersonInitialsIcon
                  lastname={d.lastname}
                  firstname={d.firstname}
                  className="people__table--id-card--initials"
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
                  <ListButton icon={faPencilAlt} />
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
    </section>
  );
};

const GridView = ({
  data, 
  showGrid, 
  getPositionName, 
  handleDeletePerson}) => {

  return (
    showGrid && (
      <section className="people__grid-content">
        <div className="people__grid">
          {data.map((d, i) => {
            return (
              <div className="people__grid--card" key={i}>
                <PersonInitialsIcon
                  lastname={d.lastname}
                  firstname={d.firstname}
                  className="people__grid--initials"
                />
                <div className="people__grid--line-item">
                  {d.firstname} {d.lastname}
                </div>
                <div className="people__grid--line-item">{d.email}</div>
                <span className="">{getPositionName(d.position)}</span>
                <div className="people__grid--line-item">{d.hiredate}</div>
                <div className="people__grid--line-item">{d.termdate}</div>
                <div>
                  <Link to={`/people/${d.id}`}>
                    <IconButton icon={faPencilAlt} label="edit" />
                  </Link>
                  <IconButton
                    icon={faTrashAlt}
                    label="delete"
                    onClickHandler={() => handleDeletePerson(d.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
};

const PersonInitialsIcon = ({
  lastname,
  firstname,
  className = "people__grid--initials",
}) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const initials = () => {
    const name = `${firstname.charAt(0)}${lastname.charAt(0)}`;
    return name.toUpperCase();
  };

  return (
    <div className={className} style={{ backgroundColor: getRandomColor() }}>
      {initials()}
    </div>
  );
};