import React, { useState, useEffect} from "react";

// import { API, graphqlOperation } from "aws-amplify";
import { listScheduless } from "../graphql/queries";
import { createSchedules, deleteSchedules } from "../graphql/mutations";

import '../styles/ScheduleMobile.scss';
import '../styles/Forms.scss';

const initialForm = { 'name': '', 'description': '' };

export const ScheduleMobile = () => {
  const [form, setForm] = useState(initialForm);
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetchSchedules();
  }, []);

  function setInput(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function addSchedule() {
    try {
      if (!form.name || !form.description) return;
      const newSchedule = { ...form };
      setSchedules([...schedules, newSchedule]);
      setForm(initialForm);
      // await API.graphql(
      //   graphqlOperation(createSchedules, { input: newSchedule })
      // );
      setShowForm(false);
    } catch (err) {
      console.log("error creating schedule:", err);
    }
  }

  async function fetchSchedules() {
    try {
      const schedulesData = []; //await API.graphql(graphqlOperation(listScheduless));
      const schedules = schedulesData.data.listScheduless.items;
      setSchedules(schedules);
    } 
    catch(err){
      console.log('ERROR fetching schedules:', err);
    }
  }

  async function deleteSchedule() {
    try {
      if (!selected.id) return;
      setSelected({id: null, name: null})
      // await API.graphql(
      //   graphqlOperation(deleteSchedules, { input: {id: selected.id} })
      // );
      setShowForm(false);
    } catch (err) {
      console.log("error creating schedule:", err);
    }
  }

  function toggleShowForm() {
    return setShowForm(!showForm);
  }

  const handleRowClick = (details) => {
    setSelected(details);
    console.log("details", details);
  };

  return (
    <main className="schedule-mobile">
      <section id="listSchedule">
        <h1>List</h1>
        <div className="schedule-mobile__list">
          {schedules.map((d, i) => {
            return (
              <div
                key={`${d.id}-${d.name}`}
                className="schedule-mobile__list--line-item"
                onClick={() => handleRowClick(d)}
              >
                <div>{d.id}</div>
                <div className="schedule-mobile__list--item-bold">{d.name}</div>
                <div>{d.description}</div>
              </div>
            );
          })}
          {schedules && schedules.length === 0 && <p>No schedules found</p>}
        </div>
        <button onClick={toggleShowForm} className="form-button">
          {showForm ? "hide" : "add"}
        </button>
      </section>

      {showForm && (
        <section id="createSchedule">
          <h1>Create</h1>

          <div className="form-field">
            <label>name</label>
            <input
              onChange={(event) => setInput("name", event.target.value)}
              value={form.name}
            />
          </div>

          <div className="form-field">
            <label>description</label>
            <input
              onChange={(event) => setInput("name", event.target.value)}
              value={form.description}
            />
          </div>

          <button onClick={addSchedule} className="form-button">
            save
          </button>
        </section>
      )}

      <section id="deleteSchedule">
        <h1>Delete</h1>

        <div className="form-field">
          <label>id</label>
          <input
            onChange={(event) => setInput("id", event.target.value)}
            value={selected.id}
          />
        </div>

        <div className="form-field">
          <label>name</label>
          <input
            onChange={(event) => setInput("name", event.target.value)}
            value={selected.name}
          />
        </div>

        <button
          onClick={deleteSchedule}
          className="form-button"
          style={{ backgroundColor: "#f00f00" }}
        >
          delete
        </button>
      </section>
    </main>
  );
};
