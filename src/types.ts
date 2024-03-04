import { Request } from 'express';

export type GetFilteredResponsesRequest = Request & {
  params: {
    formId: string;
  };
  query: {
    limit?: string;
    afterDate?: string;
    beforeDate?: string;
    offset?: string;
    status?: string;
    includeEditLink?: string;
    sort?: string;
    filters: string;
  };
};

export type Question<T extends string | number = string | number> = {
  id: string;
  name: string;
  type: string;
  value: T | undefined;
};
