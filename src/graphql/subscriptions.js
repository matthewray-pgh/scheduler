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
    }
  }
`;
