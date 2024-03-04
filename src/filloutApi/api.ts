import axios from 'axios';
import { Params } from './types';

const FILLOUT_URL = 'https://api.fillout.com/v1/api';

const api = {
  get: async (url: string, params: Params) => {
    try {
      const res = await axios.get(`${FILLOUT_URL}${url}`, {
        headers: { Authorization: `Bearer ${process.env.FILLOUT_API_KEY}` },
        params,
      });

      return res.data;
    } catch (error) {
      console.log((error as Error).message);
      throw new Error('Error getting data from Fillout API');
    }
  },
};

export default api;
