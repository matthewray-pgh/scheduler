import React, {useState, useEffect, useRef} from "react";

import { faTrash, faPen, faFilter, faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";

import {
  FormFieldText,
  FormFieldDate,
} from "../components/FormFields.js";
import {
  FormFieldButton,
  FormFieldButtonConfirm,
  IconButton,
  ListButton,
} from "../components/FormFieldButton.js";

import useSchedules from '../hooks/UseSchedules';

import '../styles/ScheduleList.scss';

const initialForm = {
  id: null,
  name: null,
  description: null,
  group: null,
  startdate: null,
  enddate: null,
  active: false,
};

export const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  const { fetchSchedulesApi, deleteScheduleApi } = useSchedules();

  const fetchData = () => {
    const schedulePromise = fetchSchedulesApi();
    schedulePromise.then((result) => {
      setSchedules(result)
      setLoading(false);
    })
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleCreateSchedule = () => {
    setShowForm(true);
    console.log("create schedule");
  };

  const handleEditClick = (d) => {
    setSelectedSchedule(d);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    //setLoading(true);
    await deleteScheduleApi(id);
    await fetchData();
    //setLoading(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <main className="schedules">
      <section
        className="schedules__control-panel"
        data-testid="schedules-control-panel"
      >
        <div className="schedules__control-panel--title-pane">
          <h1>Schedules List</h1>
        </div>
        <div className="schedules__control-panel--filter-pane">
          <FormFieldButton
            label="create schedule"
            onClickHandler={handleCreateSchedule}
          />
          <IconButton icon={faFilter} />
          <IconButton icon={faSortAmountDown} />
          <IconButton icon={faSortAmountUp} />
        </div>
      </section>

      <section data-testid="schedule-form-container">
        {/* {showForm && ( */}
        <div
          ref={formRef}
          className={showForm ? "schedules__form-show" : "schedules__form-hide"}
        >
          <ScheduleForm
            formData={selectedSchedule}
            refreshListFetch={fetchData}
            handleCancel={handleFormCancel}
          />
        </div>
        {/* )} */}
      </section>

      <section data-testid="schedule-list-container">
        {loading && <h1>Retrieving Schedules ...</h1>}
        <div className="schedules__list">
          {schedules.map((d, i) => {
            return (
              <React.Fragment key={`${d.id}-${d.name}`}>
                <span className="schedules__list--cell">
                  <div className="schedules__list--bold-text">{d.name}</div>
                  <div>{d.description}</div>
                </span>

                <span className="schedules__list--cell">
                  {d.startdate ?? "--/--/----"} to {d.enddate ?? "--/--/----"}
                </span>

                <span className="schedules__list--cell">
                  [placeholder position tags]
                </span>

                <span className="schedules__list--cell">
                  <ListButton
                    icon={faPen}
                    onClickHandler={() => handleEditClick(d)}
                  />
                </span>

                <span className="schedules__list--cell">
                  <ListButton
                    icon={faTrash}
                    onClickHandler={() => handleDeleteClick(d)}
                  />
                </span>
              </React.Fragment>
            );
          })}
          {schedules && schedules.length === 0 && <p>No schedules found</p>}
        </div>
      </section>
    </main>
  );
}

export const ScheduleForm = ({ formData, refreshListFetch, handleCancel }) => {
  const [form, setForm] = useState(initialForm);

  const { createScheduleApi, updateSchedulesApi } = useSchedules();

  useEffect(() => {
    setForm(formData);
  }, [formData]);

  const setInput = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const confirmNameField = () => {
    return form.name ? form.name : `${form.startdate}-${form.enddate}`;
  };

  const handleAddClick = async () => {
    form.name = confirmNameField();
    await createScheduleApi(form);
    await refreshListFetch();
    await setForm(initialForm);
  };

  const handleUpdateClick = async () => {
    form.name = confirmNameField();
    await updateSchedulesApi(form);
    await refreshListFetch();
    await setForm(initialForm);
  };

  return (
    <section className="schedules__details">
      <FormFieldText
        label="name"
        value={form.name}
        onChange={(event) => setInput("name", event.target.value)}
      />
      <FormFieldText
        label="description"
        value={form.description}
        onChange={(event) => setInput("description", event.target.value)}
      />
      <FormFieldDate
        label="start date"
        value={form.startdate}
        onChange={(event) => setInput("startdate", event.target.value)}
      />
      <FormFieldDate
        label="end date"
        value={form.enddate}
        onChange={(event) => setInput("enddate", event.target.value)}
      />
      <FormFieldText
        label="positions"
        value={form.group}
        onChange={(event) => setInput("group", event.target.value)}
      />
      <div data-testid="form-submit-container" style={{ display: "grid" }}>
        {form.id ? (
          <FormFieldButtonConfirm
            label="update"
            onClickHandler={handleUpdateClick}
          />
        ) : (
          <FormFieldButtonConfirm label="add" onClickHandler={handleAddClick} />
        )}
      </div>
      <div data-testid="form-cancel-container" style={{ display: "grid" }}>
        <FormFieldButton label="cancel" onClickHandler={handleCancel} />
      </div>
    </section>
  );
};