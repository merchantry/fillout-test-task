import { Question } from '../../types';
import { doesNotEqual, equals, greaterThan, lessThan } from './filterFunctions';
import { FilterClauseType, FilterCondition, SubmissionValue } from './types';

type FiltersMap = Record<FilterCondition, (question: Question, value: SubmissionValue) => boolean>;

const FILTERS: FiltersMap = {
  equals: equals,
  does_not_equal: doesNotEqual,
  greater_than: greaterThan,
  less_than: lessThan,
};

export function doesQuestionMatchFilter(question: Question, filterClause: FilterClauseType) {
  if (!(filterClause.condition in FILTERS)) {
    throw new Error(`Invalid filter condition ${filterClause.condition}`);
  }

  const filterFunction = FILTERS[filterClause.condition];
  return filterFunction(question, filterClause.value);
}
