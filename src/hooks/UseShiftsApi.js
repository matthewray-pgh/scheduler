import { API, graphqlOperation } from "aws-amplify";
import { 
  getShifts, 
  listShiftss 
} from "../graphql/queries";
import {
  createShifts,
  updateShifts,
  deleteShifts,
} from "../graphql/mutations";

function useShiftsApi() {
  const fetchShiftsList = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listShiftss));
      const results = response.data.listShiftss.items;
      return results;
    } catch (err) {
      console.log("ERROR fetching shifts:", err);
    }
  };

  const fetchShift = async (id) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getShifts, { id: id })
      );
      const result = response.data.getShifts;
      return result;
    } catch (err) {
      console.log("ERROR fetching Shifts:", err);
    }
  };

  const createShift = async (form) => {
    try {
      if (!form.shift) return;
      const newShift = { ...form };
      const response = await API.graphql(
        graphqlOperation(createShifts, { input: newShift })
      );
      const result = response.data.createShift;
      return result;
    } catch (err) {
      console.log("error creating shift", err);
    }
  };

  const updateShift = async (form) => {
    try {
      if (!form.id) return;
      const updShift = { ...form };
      const response = await API.graphql(
        graphqlOperation(updateShifts, { input: updShift })
      );
      const result = response.data.updateShifts;
      return result;
    } catch (err) {
      console.log(`error updating shift - ${form.id}:`, err);
    }
  };

  const deleteShift = async (id) => {
    try {
      if (!id) return;
      const response = await API.graphql(
        graphqlOperation(deleteShifts, { input: { id: id } })
      );
      const result = response.data.deleteShifts;
      return result;
    } catch (err) {
      console.log(`error deleting shift - ${id}:`, err);
    }
  };

  return {
    fetchShiftsList,
    fetchShift,
    createShift,
    updateShift,
    deleteShift
  };
}

export default useShiftsApi;