import express from 'express';
import { authAdmin, setupAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/setup', setupAdmin); // Can be disabled later after setup

export default router;
