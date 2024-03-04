import api from './api';
import { Params, SubmissionsResult } from './types';

export function getFormSubmissions(formId: string, params: Params): Promise<SubmissionsResult> {
  return api.get(`/forms/${formId}/submissions`, params);
}
