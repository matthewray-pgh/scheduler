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
      }
      nextToken
    }
  }
`;
