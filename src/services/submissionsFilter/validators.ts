import { VALID_FILTERS } from './config';

export const isFilterConditionValid = (condition: string) =>
  VALID_FILTERS.includes(condition as (typeof VALID_FILTERS)[number]);
