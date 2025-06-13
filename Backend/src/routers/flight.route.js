import express from 'express';
import { searchAirports, searchFlights } from '../controllers/flight.controller.js';

const router = express.Router();

// Airport search endpoint
router.get('/airports', searchAirports);

// Flight search endpoint
router.get('/search', searchFlights);

export default router; 