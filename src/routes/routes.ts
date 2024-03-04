import router from './router';
import { getFilteredResponses } from '../controllers';
import { validateFilters } from '../middleware/validateFilters';

router.get('/:formId/filteredResponses', validateFilters, getFilteredResponses);

router.get('/test', (_req, res) => {
  res.send('Hello, world!');
});

export default router;
