import { FilterClauseType } from './types';

export const createFilterArray = (filters: string) => {
  try {
    return JSON.parse(filters) as FilterClauseType[];
  } catch (e) {
    return undefined;
  }
};

export const createFiltersMap = (filters: string) =>
  new Map((createFilterArray(filters) ?? []).map(filter => [filter.id, filter]));
