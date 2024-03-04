import { InputError } from '../../errors';
import { Question } from '../../types';
import { QuestionType } from './enums';
import { SubmissionValue } from './types';

export function equals<T extends SubmissionValue>(question: Question<T>, value: T) {
  return question.value === value;
}

export function doesNotEqual<T extends SubmissionValue>(question: Question<T>, value: T) {
  return question.value !== value;
}

function compareNumberOrDate<T extends number | Date>(
  question: Question<SubmissionValue>,
  value: SubmissionValue,
  compare: (a: T, b: T) => boolean,
) {
  if (question.value === null || question.value === undefined) {
    return false;
  }

  if (
    ![QuestionType.NumberInput, QuestionType.DatePicker].includes(question.type as QuestionType)
  ) {
    throw new InputError(`Cannot compare ${question.type} with greater_than or less_than`);
  }

  switch (question.type) {
    case QuestionType.NumberInput:
      return compare(question.value as T, value as T);
    case QuestionType.DatePicker:
      return compare(new Date(question.value) as T, new Date(value as string) as T);
    default:
      return false;
  }
}

export function greaterThan<T extends SubmissionValue>(question: Question<T>, value: T) {
  return compareNumberOrDate(question, value, (a, b) => a > b);
}

export function lessThan<T extends SubmissionValue>(question: Question<T>, value: T) {
  return compareNumberOrDate(question, value, (a, b) => a < b);
}
