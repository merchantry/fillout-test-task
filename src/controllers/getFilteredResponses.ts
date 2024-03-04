import { NextFunction, Response } from 'express';
import { getFormSubmissions } from '../filloutApi/submissions';
import { createFiltersMap } from '../services/submissionsFilter/helpers';
import { doesQuestionMatchFilter } from '../services/submissionsFilter/filters';
import { GetFilteredResponsesRequest } from '../types';

const DEFAULT_LIMIT = 150;

/**
 * Filters form submissions based on the provided filters. Fetches the form submissions from the
 * fillout API. Calculates new total responses and page count based on the filtered submissions.
 *
 * The limit query is not used in the fillout API call to fetch the maximum number of submissions.
 * But it is used to limit the number of responses returned to the client after filtering.
 */
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
