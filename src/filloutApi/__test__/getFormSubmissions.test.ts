import { FORM_ID } from '../../testConfig';
import api from '../api';
import { getFormSubmissions } from '../submissions';

describe('getFormSubmissions', () => {
  it('should call api.get with the correct arguments', async () => {
    const params = { limit: '150' };
    const getSpy = jest.spyOn(api, 'get').mockResolvedValue({ responses: [], totalResponses: 0 });
    await getFormSubmissions(FORM_ID, params);
    expect(getSpy).toHaveBeenCalledWith(`/forms/${FORM_ID}/submissions`, params);
  });
});
