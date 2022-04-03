// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sections, Shifts, Schedule, Positions, Person } = initSchema(schema);

export {
  Sections,
  Shifts,
  Schedule,
  Positions,
  Person
};