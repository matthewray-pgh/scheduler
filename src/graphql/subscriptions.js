/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchedules = /* GraphQL */ `
  subscription OnCreateSchedules {
    onCreateSchedules {
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
export const onUpdateSchedules = /* GraphQL */ `
  subscription OnUpdateSchedules {
    onUpdateSchedules {
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
export const onDeleteSchedules = /* GraphQL */ `
  subscription OnDeleteSchedules {
    onDeleteSchedules {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
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
export const onCreateShifts = /* GraphQL */ `
  subscription OnCreateShifts {
    onCreateShifts {
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
export const onUpdateShifts = /* GraphQL */ `
  subscription OnUpdateShifts {
    onUpdateShifts {
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
export const onDeleteShifts = /* GraphQL */ `
  subscription OnDeleteShifts {
    onDeleteShifts {
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
