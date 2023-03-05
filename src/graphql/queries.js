/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchedules = /* GraphQL */ `
  query GetSchedules($id: ID!) {
    getSchedules(id: $id) {
      id
      name
      description
      startdate
      enddate
      active
      published
      complete
      group
      createdAt
      updatedAt
    }
  }
`;
export const listScheduless = /* GraphQL */ `
  query ListScheduless(
    $filter: ModelSchedulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduless(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        startdate
        enddate
        active
        published
        complete
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      lastname
      firstname
      email
      phone
      hiredate
      termdate
      position
      active
      createdAt
      updatedAt
    }
  }
`;
export const listPersons = /* GraphQL */ `
  query ListPersons(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastname
        firstname
        email
        phone
        hiredate
        termdate
        position
        active
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShifts = /* GraphQL */ `
  query GetShifts($id: ID!) {
    getShifts(id: $id) {
      id
      personid
      scheduleid
      shift
      section
      createdAt
      updatedAt
    }
  }
`;
export const listShiftss = /* GraphQL */ `
  query ListShiftss(
    $filter: ModelShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShiftss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        personid
        scheduleid
        shift
        section
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
