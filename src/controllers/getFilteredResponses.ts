import { NextFunction, Response } from 'express';
import { getFormSubmissions } from '../filloutApi/submissions';
import { createFiltersMap } from '../services/submissionsFilter/helpers';
import { doesQuestionMatchFilter } from '../services/submissionsFilter/filters';
import { GetFilteredResponsesRequest } from '../types';

const DEFAULT_LIMIT = 150;

export const getFilteredResponses = async (
  req: GetFilteredResponsesRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const formId = req.params.formId;
    const { filters, limit: _limit, ...formSubmissionParams } = req.query;
    const limit = Number(_limit) || DEFAULT_LIMIT;
    const filtersMap = createFiltersMap(filters);

    const submissionsResult = await getFormSubmissions(formId, formSubmissionParams);

    const filteredFormSubmissions = submissionsResult.responses.filter(submission =>
      submission.questions.every(question => {
        const questionFilter = filtersMap.get(question.id);
        if (!questionFilter) return true;
        return doesQuestionMatchFilter(question, questionFilter);
      }),
    );

    res.send({
      responses: filteredFormSubmissions.slice(0, limit),
      totalResponses: filteredFormSubmissions.length,
      pageCount: Math.ceil(filteredFormSubmissions.length / limit),
    });
  } catch (error) {
    next(error);
  }
};
