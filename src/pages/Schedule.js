import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { 
  faTrashAlt, 
  faPencilAlt,
  faCalendarAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  FormFieldText,
  FormFieldDate,
} from "../components/FormFields.js";
import {
  FormFieldButton,
  FormFieldButtonConfirm,
  ListButton,
} from "../components/FormFieldButton.js";

import { IconButton } from "../components/FormFieldButton.js";

import useSchedulesApi from '../hooks/UseSchedulesApi.js';

import '../styles/ScheduleList.scss';
import { ListLayout } from "../layouts/ListLayout.js";

const initialForm = {
  id: null,
  name: '',
  description: '',
  group: '',
  startdate: '',
  enddate: '',
  active: false,
};

export const Schedule = () => {
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchScheduleList } = useSchedulesApi();

  const fetchData = () => {
    const schedulePromise = fetchScheduleList();
    schedulePromise.then((result) => {
      setSchedules(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, []);

  const { deleteSchedule } = useSchedulesApi();

  const handleShowForm = () => {
    setShowForm(true);
  }

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteSchedule(id)
      .then((result) => {
        if (result.id) {
          fetchData();
        } else {
          console.error("TODO: Display error on screen");
          setLoading(false);
        }
      })
      .then(() => setLoading(false));
  };

  const handleEdit = (d) => {
    setForm(d);
    setShowForm(true);
  };

  return (
    <ListLayout 
      listComponent={() => {
        return <ListView
            schedules={schedules}
            loading={loading}
            handleShowForm={handleShowForm}
            handleDeleteClick={handleDelete}
            handleEditClick={handleEdit}
          />
      }}
      formComponent={() => {
        return <FormView
            form={form}
            setForm={setForm}
            refreshListFetch={fetchData}
            setShowForm={setShowForm}
          />
      }} 
      showForm={showForm}
    />
  );
};

export const FormView = ({ form, setForm, refreshListFetch, setShowForm }) => {
  const { createSchedule, updateSchedule } = useSchedulesApi();

  const setInput = (key, value) => {
    console.log("setInput", key, value);
    setForm({ ...form, [key]: value });
  };

  const confirmNameField = () => {
    return form.name ? form.name : `${form.startdate}-${form.enddate}`;
  };

  const handleAddClick = async () => {
    form.name = confirmNameField();
    await createSchedule(form);
    await refreshListFetch();
    await setForm(initialForm);
  };

  const handleUpdateClick = async () => {
    form.name = confirmNameField();
    await updateSchedule(form);
    await refreshListFetch();
  };

  const handleFormCancel = async () => {
    await setForm(initialForm);
    await setShowForm(false);
  };

  return (
    <section className="schedules-form">
      <h2 className="schedules-form__title">
        {form.id ? "edit schedule" : "add schedule"}
      </h2>
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
          <FormFieldButtonConfirm
            label="create"
            onClickHandler={handleAddClick}
          />
        )}
      </div>
      <div data-testid="form-cancel-container" style={{ display: "grid" }}>
        <FormFieldButton label="cancel" onClickHandler={handleFormCancel} />
      </div>
    </section>
  );
};

export const ListView = ({
  loading,
  schedules,
  handleShowForm,
  handleEditClick,
  handleDeleteClick,
}) => {

  return (
    <main className="schedules-list">
      <section className="schedules-list__main-content">
        <section className="schedules-list__header-bar">
          <h1>Schedules</h1>
        </section>

        <section
          data-testid="schedule-list-container"
          className="schedules-list__list-container"
        >
          {loading && <h1>Retrieving Schedules ...</h1>}
          <div className="schedules-list__grid">
            {schedules.map((d, i) => {
              return (
                <React.Fragment key={`${d.id}-${d.name}`}>
                  <span className="schedules-list__grid--cell">
                    <div className="schedules-list__grid--bold-text">
                      {d.name}
                    </div>
                    <div>{d.description}</div>
                  </span>

                  <span className="schedules-list__grid--cell">
                    {d.startdate ?? "--/--/----"} to {d.enddate ?? "--/--/----"}
                  </span>

                  <span className="schedules-list__grid--cell">
                    [placeholder position tags]
                  </span>

                  <span className="schedules-list__grid--cell">
                    <Link to={`/schedule/${d.id}`}>
                      <ListButton
                        icon={faCalendarAlt}
                        onClickHandler={() => {}}
                      />
                    </Link>
                  </span>

                  <span className="schedules-list__grid--cell">
                    <ListButton
                      icon={faPencilAlt}
                      onClickHandler={() => handleEditClick(d)}
                    />
                  </span>

                  <span className="schedules-list__grid--cell">
                    <ListButton
                      icon={faTrashAlt}
                      onClickHandler={() => handleDeleteClick(d.id)}
                    />
                  </span>
                </React.Fragment>
              );
            })}
            {schedules && schedules.length === 0 && <p>No schedules found</p>}
          </div>
          <div className="schedules-list__button-container">
            <FormFieldButton
              label="add schedule"
              onClickHandler={handleShowForm}
            />
          </div>
        </section>
      </section>
    </main>
  );
};