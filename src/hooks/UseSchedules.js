import { API, graphqlOperation } from "aws-amplify";
import { listScheduless } from "../graphql/queries";
import {
  createSchedules,
  updateSchedules,
  deleteSchedules,
} from "../graphql/mutations";

function useSchedules(){
  const fetchSchedulesApi = async () => {
    try {
      const schedulesData = await API.graphql(graphqlOperation(listScheduless));
      const schedules = schedulesData.data.listScheduless.items;
      return schedules;
    } catch (err) {
      console.log("ERROR fetching schedules:", err);
    }
  };

  const createScheduleApi = async (form) => {
    try {
      if (!form.name || !form.startdate || !form.enddate) return;
      const newSchedule = { ...form, active: true };
      const result = await API.graphql(
        graphqlOperation(createSchedules, { input: newSchedule })
      );
      return result;
    } catch (err) {
      console.log("error creating schedule", err);
    }
  };

  const updateSchedulesApi = async (form) => {
    try {
      if (!form.id) return;
      const updSchedule = { ...form };
      const result = await API.graphql(
        graphqlOperation(updateSchedules, { input: updSchedule })
      );
      return result;
    } catch (err) {
      console.log(`error updating schedule - ${form.id}:`, err);
    }
  };

  const deleteScheduleApi = async (id) => {
    try {
      if (!id) return;
      const result = await API.graphql(
        graphqlOperation(deleteSchedules, { input: { id: id } })
      );
      return result;
    } catch (err) {
      console.log(`error deleting schedule - ${id}:`, err);
    }
  }

  return {
    fetchSchedulesApi,
    createScheduleApi,
    updateSchedulesApi,
    deleteScheduleApi,
  };
};

export default useSchedules;