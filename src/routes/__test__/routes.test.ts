import request from 'supertest';
import app from '../../app';
import { FORM_ID } from '../../testConfig';

describe('GET /test', () => {
  it('should return "Hello, world!"', () => {
    return request(app).get('/test').expect('Hello, world!').expect(200);
  });
});

describe('GET /:formId/filteredResponses', () => {
  it('should return 400 if filters query parameter is missing', () => {
    return request(app).get(`/${FORM_ID}/filteredResponses`).expect(400);
  });

  it('should return 400 if filters query parameter is not a valid JSON', () => {
    return request(app).get(`/${FORM_ID}/filteredResponses?filters=invalid`).expect(400);
  });

  it('should return 400 if filters query parameter is not constructed properly', () => {
    const filters = JSON.stringify([
      { id: 'fFnyxwWa3KV6nBdfBDCHEA', condition: 'eq', value: 'test' },
    ]);

    return request(app).get(`/${FORM_ID}/filteredResponses?filters=${filters}`).expect(400);
  });

  it('should return 200 if filters query parameter is a valid JSON', () => {
    const filters = JSON.stringify([
      { id: 'fFnyxwWa3KV6nBdfBDCHEA', condition: 'equals', value: 'test' },
    ]);

    return request(app).get(`/${FORM_ID}/filteredResponses?filters=${filters}`).expect(200);
  });
});
