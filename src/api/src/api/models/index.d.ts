import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SectionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShiftsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PositionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Sections {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Sections, SectionsMetaData>);
  static copyOf(source: Sections, mutator: (draft: MutableModel<Sections, SectionsMetaData>) => MutableModel<Sections, SectionsMetaData> | void): Sections;
}

export declare class Shifts {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Shifts, ShiftsMetaData>);
  static copyOf(source: Shifts, mutator: (draft: MutableModel<Shifts, ShiftsMetaData>) => MutableModel<Shifts, ShiftsMetaData> | void): Shifts;
}

export declare class Schedule {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class Positions {
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Positions, PositionsMetaData>);
  static copyOf(source: Positions, mutator: (draft: MutableModel<Positions, PositionsMetaData>) => MutableModel<Positions, PositionsMetaData> | void): Positions;
}

export declare class Person {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone1?: string | null;
  readonly phone2?: string | null;
  readonly hireDate?: string | null;
  readonly termDate?: string | null;
  readonly position?: number[] | null;
  readonly active?: boolean | null;
  readonly available?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Person, PersonMetaData>);
  static copyOf(source: Person, mutator: (draft: MutableModel<Person, PersonMetaData>) => MutableModel<Person, PersonMetaData> | void): Person;
}