import { API, graphqlOperation } from "aws-amplify";
import { getPerson, listPersons } from "../graphql/queries";
import { createPerson, updatePerson, deletePerson } from "../graphql/mutations";

function usePersonAPI(){
  const fetchPersonList = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listPersons));
      const result = response.data.listPersons.items;
      return result;
    } catch (err) {
      console.error("ERROR fetching person list!", err)
    }
  };  

  const fetchPerson = async (id) => {
    try {
      const response = await API.graphql(graphqlOperation(getPerson, { id: id }));
      const result = response.data.getPerson;
      return result;
    } catch (err) {
      console.error(`ERROR fecthing person - ${id}`, err);
    }
  };

  const createNewPerson = async (personData) => {
    try {
      const response = await API.graphql(graphqlOperation(createPerson, { input: personData }));
      const result = response.data.createPerson;
      return result;
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  const updateCurrentPerson = async (personData) => {
    try {
      const response = await API.graphql(graphqlOperation(updatePerson, { input: personData }));
      const result = response.data.updatePerson;
      return result;
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  const deleteCurrentPerson = async (id) => {
    try {
      const response = await API.graphql(graphqlOperation(deletePerson, { input: { id: id } }));
      const result = response.data.deletePerson;
      return result;
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  return { 
    fetchPersonList, 
    fetchPerson, 
    createNewPerson, 
    updateCurrentPerson, 
    deleteCurrentPerson 
  };
}

export default usePersonAPI;