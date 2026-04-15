import express from 'express';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, createTeamMember);

router.route('/:id')
  .put(protect, updateTeamMember)
  .delete(protect, deleteTeamMember);

export default router;
