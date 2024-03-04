import { VALID_FILTERS } from './config';

export type SubmissionValue = string | number;

export type FilterCondition = (typeof VALID_FILTERS)[number];

export type FilterClauseType = {
  id: string;
  condition: FilterCondition;
  value: SubmissionValue;
};
