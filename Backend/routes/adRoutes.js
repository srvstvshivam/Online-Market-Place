import express from 'express';
import {
  createAd, getAds, getFeaturedAds, getMyAds, getAdById, deleteAd, getAdsByTitle, updateAd
} from '../controllers/adController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';


const router = express.Router();

// Protected routes
router.post('/new', protect, upload.array('images', 5), createAd);
router.post('/search', protect, getAdsByTitle);
router.get('/my-ads', protect, getMyAds);
router.delete('/:id', protect, deleteAd);
router.put('/:id', protect, updateAd);


// Public routes
router.get('/', getAds);
router.get('/featured', getFeaturedAds);
router.get('/:id', getAdById);


export default router;