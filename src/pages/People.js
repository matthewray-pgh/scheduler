import React, { Fragment, useState, useEffect } from "react";

import usePersonAPI from "../hooks/UsePersonApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
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
  FormFieldText,
  FormFieldEmail,
  FormFieldPhone,
  FormFieldDate,
} from "../components/FormFields.js";
import {
  FormFieldButton,
  FormFieldButtonConfirm,
  IconButton,
  ListButton,
} from "../components/FormFieldButton.js";

const initialForm = {
  id: null,
  lastname: null,
  firstname: null,
  email: null,
  phone: null,
  hiredate: null,
  termdate: null,
  position: null,
  active: false
};

export const People = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialForm);

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
    setForm(person);
  };

  return (
    <main className="people__page">
      <div className="people__title">
        <h1>People</h1>
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
                    <ListButton
                      onClickHandler={() => handleEditClick(d)}
                      icon={faPencilAlt}
                    />
                  </span>
                  <span className="people__table--cell">
                    <ListButton
                      onClickHandler={() => handleDeletePerson(d.id)}
                      icon={faTrashAlt}
                    />
                  </span>

                  {d.id === form.id && (
                    <div className="people__table--edit-form">
                      <PeopleForm
                        fetch={getPersons}
                        formData={form}
                        resetForm={setForm}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          <div style={{display: "grid"}}>
            <FormFieldButton 
              label="add person" 
              onClickHandler={() => console.log("show add person form")} 
            />
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

export const PeopleForm = ({fetch, formData, resetForm}) => {
  const [form, setForm] = useState(initialForm);
  const {
    createNewPerson,
    updateCurrentPerson
  } = usePersonAPI();

  useEffect(() => {
    setForm(formData);
  }, [formData]);

  const setInput = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addPersonAPI = async () => {
    if (!form.lastname || !form.firstname || !form.email) return;
    let newPerson = { ...form, active: true };
    createNewPerson(newPerson).then((result) => {
      if (result.id) {
        fetch();
      } else {
        console.error("TODO: Display error on screen");
      }
    });
  };

  const updatePersonAPI = async () => {
    if (!form.id) return;
    let updatePerson = {...form}
    updateCurrentPerson(updatePerson).then((result) => {
      if (result.id) {
        fetch();
        setForm(initialForm);
        resetForm(initialForm);
      } else {
        console.error("TODO: Display error on screen");
      }
    });
  };

  const handleAddClick = async () => {
    await addPersonAPI();
    setForm(initialForm);
  }

  const handleUpdateClick = async () => {
    await updatePersonAPI();
    setForm(initialForm);
  }

  const handleCancel = () => {
    setForm(initialForm);
    resetForm(initialForm);
  };

  return (
    <section className="people__details">
      <FormFieldText
        label="first name"
        value={form.firstname}
        onChange={(event) => setInput("firstname", event.target.value)}
      />
      <FormFieldText
        label="last name"
        value={form.lastname}
        onChange={(event) => setInput("lastname", event.target.value)}
      />
      <FormFieldEmail
        label="email"
        value={form.email}
        onChange={(event) => setInput("email", event.target.value)}
      />
      <FormFieldPhone
        label="phone"
        value={form.phone}
        onChange={(event) => setInput("phone", event.target.value)}
      />
      <FormFieldDate
        label="hire date"
        value={form.hiredate}
        onChange={(event) => setInput("hiredate", event.target.value)}
      />
      <FormFieldDate
        label="term date"
        value={form.termdate}
        onChange={(event) => setInput("termdate", event.target.value)}
      />
      {form.id ? (
        <FormFieldButtonConfirm label="update" onClickHandler={handleUpdateClick} />
      ) : (
        <FormFieldButtonConfirm label="add" onClickHandler={handleAddClick} />
      )}

      <FormFieldButton label="cancel" onClickHandler={handleCancel} />
    </section>
  );
};