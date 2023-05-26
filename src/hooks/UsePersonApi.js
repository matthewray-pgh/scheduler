//import { API, graphqlOperation } from "aws-amplify";
import { getPerson, listPersons } from "../graphql/queries";
import { createPerson, updatePerson, deletePerson } from "../graphql/mutations";

import peopleList from "../assets/mockFetchPersonList.json";

function usePersonAPI(){
  const fetchPersonList = async () => {
    try {
      // const response = await API.graphql(graphqlOperation(listPersons));
      // const result = response.data.listPersons.items;
      const result = peopleList;
      return result;
    } catch (err) {
      console.error("ERROR fetching person list!", err)
    }
  };  

  const fetchPerson = async (id) => {
    try {
      const response = []; //await API.graphql(graphqlOperation(getPerson, { id: id }));
      const result = response.data.getPerson;
      return result;
    } catch (err) {
      console.error(`ERROR fecthing person - ${id}`, err);
    }
  };

  const createNewPerson = async (personData) => {
    try {
      const response = []; //await API.graphql(graphqlOperation(createPerson, { input: personData }));
      const result = response.data.createPerson;
      return result;
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  const updateCurrentPerson = async (personData) => {
    try {
      console.log("personData", personData);
      const response = []; //await API.graphql(graphqlOperation(updatePerson, { input: personData }));
      const result = response.data.updatePerson;
      return result;
    } catch (err) {
      console.log("error creating person", err);
    }
  };

  const deleteCurrentPerson = async (id) => {
    try {
      const response = []; //await API.graphql(graphqlOperation(deletePerson, { input: { id: id } }));
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