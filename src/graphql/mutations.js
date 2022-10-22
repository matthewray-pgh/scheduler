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
