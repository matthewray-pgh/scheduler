import React, { useState, useEffect } from "react";
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

import { toastType, Toast } from "../components/Toast";

import '../styles/PeopleForm.scss';

export const GenerateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export const PeopleForm = () => {
  const initialForm = {
    id: null,
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    hiredate: '',
    termdate: '',
    position: '',
    active: false,
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  
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

  const createToast = (type, message) => {
    return {
      id: GenerateUUID(),
      type: type,
      message: message
    };
  }

  const addPersonAPI = async () => {
    if (!form.lastname || !form.firstname || !form.email) return;
    let newPerson = { ...form, active: true };
    createNewPerson(newPerson).then((result) => {
      let newToast = {};
      if (result.id) {
        newToast = createToast(toastType.CONFIRM, `Successfully added ${form.firstname} ${form.lastname}!`,);
      } else {
        newToast = createToast(toastType.ERROR, `Error adding ${form.firstname} ${form.lastname}!`);
      }
      setToasts([...toasts, newToast]);
    });
  };

  const updatePersonAPI = async () => {
    if (!form.id) return;
    let updatePerson = { ...form };
    updateCurrentPerson(updatePerson).then((result) => {
      let newToast = {};
      if (result.id) {
        newToast = createToast(toastType.confirm, `Successfully updated ${form.firstname} ${form.lastname}!`);
        setForm(initialForm);
      } else {
        newToast = createToast(toastType.error, `Error adding ${form.firstname} ${form.lastname}!`);
      }
      setToasts([...toasts, newToast]);
    });
  };

  useEffect(() => {
    console.log('toasts', toasts);
  }, [toasts]);

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
          {toasts && <Toast lists={toasts} setToastList={setToasts} />}
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