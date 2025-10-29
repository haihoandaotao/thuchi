import { Router } from 'express';
import {
  getMonthlyReport,
  getYearlyReport,
  getCategoryReport,
} from '../controllers/report.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/monthly', getMonthlyReport);
router.get('/yearly', getYearlyReport);
router.get('/category', getCategoryReport);

export default router;
