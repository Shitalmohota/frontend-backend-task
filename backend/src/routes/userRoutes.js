// /project-root/backend/src/routes/userRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Protected routes for profile management
router.route('/profile')
    .get(protect, getUserProfile)      // GET /api/users/profile
    .put(protect, updateUserProfile);  // PUT /api/users/profile

export default router;