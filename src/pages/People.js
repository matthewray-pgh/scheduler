import React, { Fragment, useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import { PeopleForm } from "./PeopleForm.js";
import { JobType } from "../components/JobType.js";
import { ModalConfirm } from "../components/ModalConfirm";
import usePersonAPI from "../hooks/UsePersonApi";

import {
  faTrashAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/People.scss";
import { ListLayout } from "../layouts/ListLayout.js";

import {
  IconButton,
  ListButton,
} from "../components/FormFieldButton.js";
import { HeaderDetails } from "../components/HeaderDetails/HeaderDetails.jsx";

const intialForm = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  active: false,
};

export const People = () => {
  const [form, setForm] = useState(intialForm);
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([]);
  const [listView, setListView] = useState(true);
  const [gridView, setGridView] = useState(false);

  const baseConfirmMessage = "Are you sure you want to delete, --?";
  const [confirmMessage, setConfirmMessage] = useState(baseConfirmMessage);
  const [showDeletConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPersonId, setCurrentPersonId] = useState(null);

  const { 
    fetchPersonList, 
    deleteCurrentPerson 
  } = usePersonAPI();

  useEffect(() => {
    getPersons();
    // eslint-disable-next-line
  }, []);

  const getPersons = () => {
    fetchPersonList().then((persons) => {
      if(persons !== undefined && persons.length > 0){ 
        setData(persons)
      } 
    });
  }

  const handleDeleteClick = (id, firstName, lastName) => {
    setCurrentPersonId(id);
    setConfirmMessage(
      baseConfirmMessage.replace("--", `${firstName} ${lastName}`)
    );
    setShowDeleteConfirm(true);
  };

  const handleDeletePerson = async () => {
    const id = currentPersonId;
    if (!id) return;
    deleteCurrentPerson(id)
      .then((result) => {
        if(result.id){
          getPersons();
        }
        else{
          console.error("TODO: Display error on screen");
        }
      })
      .then(() => {
        setShowDeleteConfirm(false);
      });
  };

  const handleListViewClick = () => {
    setListView(true);
    setGridView(false);
  };

  const handleGridViewClick = () => {
    setListView(false);
    setGridView(true);
  };

  const handleEditClick = (person) => {
    setForm(person);
    setShowForm(true);
  };

  return (
    <main className="people">
      <HeaderDetails
        icon={faUsers}
        title="People"
        subtitle="extra details here"
      />
      <ListLayout
        listComponent={() => {
          return (
            <ListView
              data={data}
              showList={listView}
              handleEditClick={handleEditClick}
              handleDeletePerson={handleDeleteClick}
            />
          );
        }}
        formComponent={() => {
          return (
            <PeopleForm
              form={form}
              setForm={setForm}
              refreshListFetch={getPersons}
              setShowForm={setShowForm}
            />
          );
        }}
        showForm={showForm}
      />
    </main>
    // <main className="people__page">
    //   <div className="people__title">
    //     <h1>People</h1>
    //     <div className="people__title--button-container">
    //       <Link to={`/people/new`}>
    //         <IconButton icon={faPlus} label="add person" />
    //       </Link>
    //     </div>
    //   </div>

    //   <section className="people__header">
    //     <IconButton
    //       icon={faThList}
    //       label="list"
    //       onClickHandler={handleListViewClick}
    //       className={listView ? "icon-button-active" : "icon-button"}
    //     />
    //     <IconButton
    //       icon={faTh}
    //       label="grid"
    //       onClickHandler={handleGridViewClick}
    //       className={gridView ? "icon-button-active" : "icon-button"}
    //     />
    //   </section>

    //   <section className="people__main-content">

    //     {/* <GridView
    //       data={data}
    //       showGrid={gridView}
    //       handleDeletePerson={handleDeleteClick}
    //     /> */}

    //     {/* {data && data.length === 0 && (
    //       <div className="people__table--row-empty">
    //         <span>no results</span>
    //         <div></div>
    //       </div>
    //     )} */}
    //   </section>

    //   <ModalConfirm
    //     message={confirmMessage}
    //     actionFunc={handleDeletePerson}
    //     show={showDeletConfirm}
    //     closeFunc={() => setShowDeleteConfirm(false)}
    //   />
    // </main>
  );
};

const ListView = ({
  data,
  showList,
  handleEditClick,
  handleDeletePerson,
}) => {
  return (
    showList && (
      <section className="people__list-content">
        <div className="people__table people__table--header">
          <div>Person</div>
          <div>Position(s)</div>
          <div>Date(s)</div>
          <div className="people__table--header--span">Actions</div>
        </div>

        <div className="people__table">
          {data && data.map((d, i) => {
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
                  <JobType jobId={d.position} />
                </span>
                <span className="people__table--dates">{d.hiredate}</span>
                <span className="people__table--cell">
                  <ListButton icon={faPencilAlt} 
                    onClickHandler={() => handleEditClick(d)}/>
                </span>
                <span className="people__table--cell">
                  <ListButton
                    onClickHandler={() =>
                      handleDeletePerson(d.id, d.firstname, d.lastname)
                    }
                    icon={faTrashAlt}
                  />
                </span>
              </Fragment>
            );
          })}
        </div>
      </section>
    )
  );
};

const GridView = ({
  data, 
  showGrid, 
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
                <span className=""><JobType jobId={d.position}/></span>
                <div className="people__grid--line-item">{d.hiredate}</div>
                <div className="people__grid--line-item">{d.termdate}</div>
                <div>
                  <Link to={`/people/${d.id}`}>
                    <IconButton icon={faPencilAlt} label="edit" />
                  </Link>
                  <IconButton
                    icon={faTrashAlt}
                    label="delete"
                    onClickHandler={() => handleDeletePerson(d.id, d.firstname, d.lastname)}
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

  const initials = () => {
    const name = `${firstname.charAt(0)}${lastname.charAt(0)}`;
    return name.toUpperCase();
  };

  return (
    <div className={className}>
      {initials()}
    </div>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};