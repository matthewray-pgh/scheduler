import React, { Fragment, useState, useEffect } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { listPersons } from "../graphql/queries";
import { createPerson, updatePerson, deletePerson } from "../graphql/mutations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faFilter,
  faTrash,
  faSearch,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/People.scss";

import positionData from "../assets/positionsAPI.json";

import find from "lodash/find";

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

  useEffect(() => {
    fetchPerson();
  }, []);

  const deletePersonAPI = async (id) => {
    try {
      if(!id) return;
      await API.graphql(graphqlOperation(deletePerson, {input: { id: id, }}));
      await fetchPerson();
    } 
    catch (err){
      console.log('ERROR: ', err);
    }
  }

  const fetchPerson = async () => {
    try {
      const personData = await API.graphql(graphqlOperation(listPersons));
      const persons = personData.data.listPersons.items;
      setData(persons);
    }
    catch(err){
      console.log('ERROR fetching persons:', err);
    }
  }

  const getPositionName = (id) => {
    const data = find(positionData, ["id", parseInt(id)]);
    return data ? data.name : "unassigned";
  };

  const handleRowClick = (person) => {
    setForm(person);
  };

  const handleFilterClick = () => {
    console.log("handle filter click -- temporary");
  };

  return (
    <main className="people__page">
      <div className="people__title">
        <h1>People</h1>
      </div>
      <section className="people__header">
        <div className="people__header--search-bar">
          <input
            className="people__header--search-input"
            placeholder="Search People"
            type="text"
          ></input>
          <button className="people__header--icon-button" type="button">
            <FontAwesomeIcon
              className="people__header--button-icon"
              icon={faSearch}
            />
          </button>
        </div>

        <div className="people__header--filters">
          <IconButton onClickHandler={handleFilterClick} icon={faFilter} />
          <IconButton onClickHandler={() => {}} icon={faSortAmountDown} />
          <IconButton onClickHandler={() => {}} icon={faSortAmountUp} />
        </div>
      </section>

      <section className="people__main-content">
        <section className="people__list-content">
          <div className="people__table">
            {data.map((d, i) => {
              return (
                <Fragment key={i}>
                  <div
                    className="people__table--id-card"
                    onClick={() => handleRowClick(d)}
                  >
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

                  <span
                    className="people__table--cell"
                    onClick={() => handleRowClick(d)}
                  >
                    {getPositionName(d.position)}
                    {d.position}
                  </span>
                  <span
                    className="people__table--cell"
                    onClick={() => handleRowClick(d)}
                  >
                    {d.hiredate}
                  </span>
                  <span
                    className="people__table--cell"
                    onClick={() => handleRowClick(d)}
                  >
                    {d.active}
                  </span>
                  <span className="people__table--cell">
                    <ListButton
                      onClickHandler={() => deletePersonAPI(d.id)}
                      icon={faTrash}
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
        <PeopleForm fetch={fetchPerson} formData={form} />
      </section>
    </main>
  );
};

export const PeopleForm = ({fetch, formData}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(formData);
  }, [formData])

  const setInput = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addPersonAPI = async () => {
    try {
      if (!form.lastname || !form.firstname || !form.email) return;
      const newPerson = { ...form, active: true };
      await API.graphql(graphqlOperation(createPerson, { input: newPerson }));
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  const updatePersonAPI = async () => {
    try {
      if (!form.id) return;
      const updPerson = { ...form };
      await API.graphql(graphqlOperation(updatePerson, { input: updPerson }));
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const handleAddClick = async () => {
    await addPersonAPI();
    await fetch();
    setForm(initialForm);
  }

  const handleUpdateClick = async () => {
    await updatePersonAPI();
    await fetch();
    setForm(initialForm);
  }

  const handleCancel = () => {
    setForm(initialForm);
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