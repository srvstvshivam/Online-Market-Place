import express from 'express';
import {
  loginUser, signupUser, logoutUser, getUserProfile, updateUserProfile, toggleFavorite
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser); // Use GET for simplicity in link/button clicks
router.post('/favorites/:id', protect, toggleFavorite);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;