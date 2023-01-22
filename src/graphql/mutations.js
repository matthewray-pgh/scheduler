/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchedules = /* GraphQL */ `
  mutation CreateSchedules(
    $input: CreateSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    createSchedules(input: $input, condition: $condition) {
      id
      name
      description
      startdate
      enddate
      active
      published
      complete
      group
    }
  }
`;
export const updateSchedules = /* GraphQL */ `
  mutation UpdateSchedules(
    $input: UpdateSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    updateSchedules(input: $input, condition: $condition) {
      id
      name
      description
      startdate
      enddate
      active
      published
      complete
      group
    }
  }
`;
export const deleteSchedules = /* GraphQL */ `
  mutation DeleteSchedules(
    $input: DeleteSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    deleteSchedules(input: $input, condition: $condition) {
      id
      name
      description
      startdate
      enddate
      active
      published
      complete
      group
    }
  }
`;
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
      id
      lastname
      firstname
      email
      phone
      hiredate
      termdate
      position
      active
    }
  }
`;
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
      id
      lastname
      firstname
      email
      phone
      hiredate
      termdate
      position
      active
    }
  }
`;
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
      id
      lastname
      firstname
      email
      phone
      hiredate
      termdate
      position
      active
    }
  }
`;
export const createShifts = /* GraphQL */ `
  mutation CreateShifts(
    $input: CreateShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    createShifts(input: $input, condition: $condition) {
      id
      personid
      scheduleid
      shift
      section
    }
  }
`;
export const updateShifts = /* GraphQL */ `
  mutation UpdateShifts(
    $input: UpdateShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    updateShifts(input: $input, condition: $condition) {
      id
      personid
      scheduleid
      shift
      section
    }
  }
`;
export const deleteShifts = /* GraphQL */ `
  mutation DeleteShifts(
    $input: DeleteShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    deleteShifts(input: $input, condition: $condition) {
      id
      personid
      scheduleid
      shift
      section
    }
  }
`;
