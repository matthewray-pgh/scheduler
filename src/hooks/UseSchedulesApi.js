import { API, graphqlOperation } from "aws-amplify";
import { 
  getSchedules,
  listScheduless 
} from "../graphql/queries";
import {
  createSchedules,
  updateSchedules,
  deleteSchedules,
} from "../graphql/mutations";

function useSchedulesApi() {
  const fetchScheduleList = async () => {
    try {
      const schedulesData = await API.graphql(graphqlOperation(listScheduless));
      const schedules = schedulesData.data.listScheduless.items;
      return schedules;
    } catch (err) {
      console.log("ERROR fetching schedules:", err);
    }
  };

  const fetchSchedule = async (id) => {
    try {
      const scheduleData = await API.graphql(
        graphqlOperation(getSchedules, { id: id })
      );
      const schedules = scheduleData.data.getSchedules;
      return schedules;
    } catch (err) {
      console.log("ERROR fetching schedules:", err);
    }
  };

  const createSchedule = async (form) => {
    try {
      if (!form.name || !form.startdate || !form.enddate) return;
      const newSchedule = { ...form, active: true };
      const response = await API.graphql(
        graphqlOperation(createSchedules, { input: newSchedule })
      );
      const result = response.data.createSchedule;
      return result;
    } catch (err) {
      console.log("error creating schedule", err);
    }
  };

  const updateSchedule = async (form) => {
    try {
      if (!form.id) return;
      const updSchedule = { ...form };
      const response = await API.graphql(
        graphqlOperation(updateSchedules, { input: updSchedule })
      );
      const result = response.data.updateSchedules;
      return result;
    } catch (err) {
      console.log(`error updating schedule - ${form.id}:`, err);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      if (!id) return;
      const response = await API.graphql(
        graphqlOperation(deleteSchedules, { input: { id: id } })
      );
      const result = response.data.deleteSchedules;
      return result;
    } catch (err) {
      console.log(`error deleting schedule - ${id}:`, err);
    }
  };

  return {
    fetchSchedule,
    fetchScheduleList,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};

export default useSchedulesApi;