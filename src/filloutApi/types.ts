import { Request } from 'express';
import { Question } from '../types';

export type Params = Request['query'];

type Submission = {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: Question[];
};

export type SubmissionsResult = {
  responses: Submission[];
  totalResponses: number;
  pageCount: number;
};
