import { rapidAxios, getRapidApiKey } from '../utils/axiosConfig.js';
import dotenv from 'dotenv';

dotenv.config();

// Proxy endpoint for station search
export const searchStations = async (req, res) => {
  try {
    const { search } = req.body;
    if (!search) return res.status(400).json({ error: 'Missing search term' });

    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v1/searchStation',
      {
        params: { query: search },
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );

    let stations = response.data.data || [];
    const keywordLower = search.toLowerCase();
    stations.sort((a, b) => {
      const aCode = a.code ? a.code.toLowerCase() : '';
      const bCode = b.code ? b.code.toLowerCase() : '';
      if (aCode === keywordLower && bCode !== keywordLower) return -1;
      if (bCode === keywordLower && aCode !== keywordLower) return 1;
      return 0;
    });
    stations = stations.slice(0, 10);

    res.json({ ...response.data, data: stations });
  } catch (err) {
    console.error('Station-proxy error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};

// Trains between stations
export const searchTrainsBetweenStations = async (req, res) => {
  const { from, to, date } = req.query;
  if (!from || !to || !date) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  try {
    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
      {
        params: { fromStationCode: from, toStationCode: to, dateOfJourney: date },
        headers: {
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Train search error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};

// Train schedule by train number
export const getTrainSchedule = async (req, res) => {
  const { trainNumber } = req.query;
  if (!trainNumber) return res.status(400).json({ error: 'Missing train number' });
  try {
    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
      {
        params: { trainNo: trainNumber },
        headers: {
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Train schedule error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};

// Train live status by train number
export const getTrainLiveLocation = async (req, res) => {
  const { trainNumber } = req.query;
  if (!trainNumber) return res.status(400).json({ error: 'Missing train number' });
  try {
    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
      {
        params: { trainNo: trainNumber },
        headers: {
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Train live location error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};

// Seat availability
export const checkSeatAvailability = async (req, res) => {
  const { trainNo, date, classType, quota, fromStationCode, toStationCode } = req.query;
  if (!trainNo || !date || !classType || !quota || !fromStationCode || !toStationCode) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  try {
    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v2/checkSeatAvailability',
      {
        params: { classType, fromStationCode, quota, toStationCode, trainNo, date },
        headers: {
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Seat availability error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};

// Train fare
export const getTrainFare = async (req, res) => {
  const { trainNo, fromStationCode, toStationCode } = req.query;
  if (!trainNo || !fromStationCode || !toStationCode) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  try {
    const response = await rapidAxios.get(
      'https://irctc1.p.rapidapi.com/api/v2/getTrainFare',
      {
        params: { trainNo, fromStationCode, toStationCode },
        headers: {
          'x-rapidapi-key': getRapidApiKey(),
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Train fare error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error', details: err.response?.data || err.message });
  }
};
