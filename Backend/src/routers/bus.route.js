import express from 'express';
import { searchBuses, searchLocations } from '../controllers/bus.controller.js';

const router = express.Router();

router.get('/search', searchBuses);
router.get('/locations', searchLocations);

export default router;
