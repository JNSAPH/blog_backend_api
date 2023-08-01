import express from 'express';
import { UIController } from '../controllers/UIController';

const router = express.Router();

// Example route for the dashboard
router.get('/', (req, res) => {
  res.render('admin-dashboard', { /* Data for the template */ });
});

export default router;
