import { NextFunction, Response } from 'express';
import { InputError } from '../errors';
import { createFilterArray } from '../services/submissionsFilter/helpers';
import { GetFilteredResponsesRequest } from '../types';
import { isFilterConditionValid } from '../services/submissionsFilter/validators';

export const validateFilters = (
  req: GetFilteredResponsesRequest,
  _res: Response,
  next: NextFunction,
) => {
  const filters = req.query.filters;

  if (!filters) {
    throw new InputError('Missing filters query parameter');
  }

  const filtersArray = createFilterArray(filters);

  if (!filtersArray) {
    throw new InputError('filters query parameter is not a valid JSON array');
  }

  filtersArray.forEach(({ id, condition, value }, i) => {
    if (!id) {
      throw new InputError(`Missing id in filter at index ${i}`);
    }

    if (!condition) {
      throw new InputError(`Missing condition in filter at index ${i}`);
    }

    if (!isFilterConditionValid(condition)) {
      throw new InputError(`Invalid condition (${condition}) in filter at index ${i}`);
    }

    if (value === undefined) {
      throw new InputError(`Missing value in filter at index ${i}`);
    }
  });

  next();
};
