import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

import "../styles/Dashboard.scss";

import usePersonAPI from "../hooks/UsePersonApi";
import useSchedulesAPI from "../hooks/UseSchedulesApi";

export const Dashboard = () => {
  const [personList, setPersonList] = useState(0);

  const { fetchPersonList } = usePersonAPI();
  const getPersons = () => {
    fetchPersonList().then((persons) => {
      if (persons !== undefined && persons.length > 0) {
        setPersonList(persons.length);
      }
    });
  };

  useEffect(() => {
    getPersons();
    // eslint-disable-next-line
  }, []);

  const [scheduleList, setScheduleList] = useState([]);

  const { fetchScheduleList } = useSchedulesAPI();
  const getSchedules = () => {
    fetchScheduleList().then((schedules) => {
      if (schedules !== undefined && schedules.length > 0) {
        setScheduleList(schedules.length);
      }
    });
  };

  useEffect(() => {
    getSchedules();
    // eslint-disable-next-line
  }, []);

  return (
    <main className="dashboard__main">
      <section className="dashboard__header">
        <div className="dashboard__header--icon">
          <FontAwesomeIcon icon={faChartBar} />
        </div>
        <div className="dashboard__header--details">
          <div className="dashboard__header--details-title">Dashboard</div>
          <div className="dashboard__header--details-subtitle">
            {" "}
            extra details here
          </div>
        </div>
      </section>

      <section className="dashboard__widgets">
        <WidgetSummaryCard
          title="Employees"
          summary={personList}
          footnote="total count of all employees"
        />

        <WidgetSummaryCard
          title="Schedules"
          summary={scheduleList}
          footnote="total number of schedules"
        />
      </section>
    </main>
  );
};

const WidgetSummaryCard = ({title, summary, footnote}) => {
  return (
    <div className="dashboard__summary-card">
      <div className="dashboard__summary-card--title">{title}</div>
      <div className="dashboard__summary-card--content">{summary}</div>
      <div className="dashboard__summary-card--footer">{footnote}</div>
    </div>
  )
}
