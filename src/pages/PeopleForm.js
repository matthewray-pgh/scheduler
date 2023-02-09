import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import usePersonAPI from "../hooks/UsePersonApi";

import {
  FormFieldText,
  FormFieldEmail,
  FormFieldPhone,
  FormFieldDate,
} from "../components/FormFields.js";
import {
  FormFieldButton,
  FormFieldButtonConfirm,
} from "../components/FormFieldButton.js";

import '../styles/PeopleForm.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const toastType = Object.freeze({
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CONFIRM: 'confirm',
});

export const PeopleForm = () => {
  const initialForm = {
    id: '',
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    hiredate: '',
    termdate: '',
    position: '',
    active: false,
  };

  const initialToast = {
    type: toastType.INFO,
    message: "this is a test toast message",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(initialToast);
  
  const { 
    createNewPerson, 
    updateCurrentPerson, 
    fetchPerson } = usePersonAPI();

  const urlParams = useParams();
  const editMode = urlParams.id.toString() !== "new";

  const fetchPersonData = (id) => {
    setLoading(true);
    fetchPerson(id)
      .then((result) => {
        console.log('result', result);
        setForm({
          id: result.id,
          lastname: result.lastname,
          firstname: result.firstname,
          email: result.email,
          phone: result.phone,
          hiredate: result.hiredate,
          termdate: result.termdate,
          position: result.position,
        });
        setLoading(false);
      })
  }

  useEffect(() => {
    if(editMode) {
      fetchPersonData(urlParams.id.toString());
    }
    // eslint-disable-next-line
  }, []);

  const setInput = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const addPersonAPI = async () => {
    if (!form.lastname || !form.firstname || !form.email) return;
    let newPerson = { ...form, active: true };
    createNewPerson(newPerson).then((result) => {
      if (result.id) {
        setToast({
          type: toastType.CONFIRM,
          message: `Successfully added ${form.firstname} ${form.lastname}!`,
        });
      } else {
        setToast({
          type: toastType.ERROR,
          message: `Error adding ${form.firstname} ${form.lastname}!`,
        });
      }
    });
  };

  const updatePersonAPI = async () => {
    if (!form.id) return;
    let updatePerson = { ...form };
    updateCurrentPerson(updatePerson).then((result) => {
      if (result.id) {
        setToast({
          type: 'confirm', 
          message: `Successfully updated ${form.firstname} ${form.lastname}!`
        });
        setForm(initialForm);
      } else {
        setToast({
          type: "error",
          message: `Error adding ${form.firstname} ${form.lastname}!`,
        });
      }
    });
  };

  const handleAddClick = async () => {
    await addPersonAPI();
    await setForm(initialForm); 
  };

  const handleUpdateClick = async () => {
    await updatePersonAPI();
    await setForm(initialForm);
  };

  const handleCancel = () => {
    if(editMode){
      fetchPersonData(form.id);
    }
    else{
      setForm(initialForm);
    }
  };

  const confirmButton = () => {
    return form.id ? (
      <FormFieldButtonConfirm
        label="update"
        onClickHandler={handleUpdateClick}
      />
    ) : (
      <FormFieldButtonConfirm 
        label="add" 
        onClickHandler={handleAddClick} 
      />
    );
  }

  const Toast = ({ type='info', message='' }) => {
    const toastIcon = useMemo(() => {
      if (type === toastType.CONFIRM) return faCheckCircle;
      else if (type === toastType.INFO) return faInfoCircle;
      else if (type === toastType.WARN) return faExclamationTriangle;
      else if (type === toastType.ERROR) return faExclamationCircle;
      else return faCheckCircle;
    }, [type]);

    const handleToastClose = () => {
      setToast({
        type: '', message: ''
      });
    }

    useEffect(() => {
      const timeUntilDelete = 500;
      const interval = setInterval(() => {
        console.log("interval message");
      }, timeUntilDelete);
      return clearInterval(interval);
    }, []);

    return (
      <div className={`toast toast__${type}`}>
        <FontAwesomeIcon icon={toastIcon} className="toast__icon" />
        <div>{message}</div>
        <FontAwesomeIcon
          icon={faTimes}
          className="toast__close-button"
          onClick={handleToastClose}
        />
      </div>
    );
  }

  return (
    <main>
      <section className="people">
        <div className="people__title">
          <h1>People</h1>
        </div>
      </section>

      <section className="people__form">
        <h2 className="people__form--header">
          {editMode ? "edit" : "add"} person
        </h2>

        <div className="people__form--toast">
          {toast.message && <Toast type={toast.type} message={toast.message} />}
        </div>

        <div className="people__form--first-name">
          <FormFieldText
            label="first name"
            value={form.firstname}
            onChange={(event) => setInput("firstname", event.target.value)}
          />
        </div>
        <div className="people__form--last-name">
          <FormFieldText
            label="last name"
            value={form.lastname}
            onChange={(event) => setInput("lastname", event.target.value)}
          />
        </div>
        <div className="people__form--email">
          <FormFieldEmail
            label="email"
            value={form.email}
            onChange={(event) => setInput("email", event.target.value)}
          />
        </div>
        <div className="people__form--phone">
          <FormFieldPhone
            label="phone"
            value={form.phone}
            onChange={(event) => setInput("phone", event.target.value)}
          />
        </div>

        <div className="people__form--job">
          <FormFieldText
            label="position"
            value={form.position}
            onChange={(event) => setInput("position", event.target.value)}
          />
        </div>

        <div className="people__form--hire-date">
          <FormFieldDate
            label="hire date"
            value={form.hiredate}
            onChange={(event) => setInput("hiredate", event.target.value)}
          />
        </div>
        <div className="people__form--term-date">
          <FormFieldDate
            label="term date"
            value={form.termdate}
            onChange={(event) => setInput("termdate", event.target.value)}
          />
        </div>
        <div className="people__form--confirm-button">{confirmButton()}</div>
        <div className="people__form--cancel-button">
          <FormFieldButton label="cancel" onClickHandler={handleCancel} />
        </div>
      </section>
    </main>
  );
};
