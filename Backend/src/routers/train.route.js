import express from 'express';
import {
  searchStations,
  searchTrainsBetweenStations,
  getTrainSchedule,
  getTrainLiveLocation,
  checkSeatAvailability,
  getTrainFare
} from '../controllers/train.controller.js';

const router = express.Router();

// Station search (POST with body)
router.post('/stations', searchStations);

// Trains search from one station to another
router.get('/trainbetweenstations', searchTrainsBetweenStations);

// Train schedule - supports both /trainschedule and /schedule
router.get('/trainschedule', getTrainSchedule);
router.get('/schedule', getTrainSchedule);

// Train live status - supports both /trainlivelocation and /status
router.get('/trainlivelocation', getTrainLiveLocation);
router.get('/status', getTrainLiveLocation);

// Seat availability
router.get('/seatavailability', checkSeatAvailability);

// Train fare
router.get('/trainfare', getTrainFare);

export default router;
