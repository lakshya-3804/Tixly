import dotenv from 'dotenv';
import { rapidAxios, getRapidApiKey } from '../utils/axiosConfig.js';

dotenv.config();

const airportCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const searchAirports = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.length < 2) return res.json([]);

    const cacheKey = keyword.toLowerCase();
    const cachedResult = airportCache.get(cacheKey);
    if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_DURATION) {
      return res.json(cachedResult.data);
    }

    const options = {
      method: 'GET',
      url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
      params: { q: keyword, limit: '10' },
      headers: {
        'x-rapidapi-key': getRapidApiKey(),
        'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
      }
    };

    const response = await rapidAxios.request(options);
    if (!response.data || !response.data.items) return res.json([]);

    let formattedAirports = response.data.items.map(airport => ({
      iataCode: airport.iata,
      name: airport.name,
      cityName: airport.municipalityName || '',
      countryName: airport.countryCode || ''
    }));

    const keywordLower = keyword.toLowerCase();
    formattedAirports.sort((a, b) => {
      const aIata = a.iataCode ? a.iataCode.toLowerCase() : '';
      const bIata = b.iataCode ? b.iataCode.toLowerCase() : '';
      if (aIata === keywordLower && bIata !== keywordLower) return -1;
      if (bIata === keywordLower && aIata !== keywordLower) return 1;
      return 0;
    });
    formattedAirports = formattedAirports.slice(0, 10);

    airportCache.set(cacheKey, { data: formattedAirports, timestamp: Date.now() });
    return res.json(formattedAirports);

  } catch (error) {
    console.error('Airport search error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to search airports', details: error.response?.data || error.message });
  }
};



export const searchFlights = async (req, res) => {
  try {
    const { originLocationCode, destinationLocationCode, departureDate } = req.query;

    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return res.status(400).json({ error: 'Missing required parameters: origin, destination, departure date' });
    }

    const originCode = originLocationCode.toUpperCase();
    const destCode = destinationLocationCode.toUpperCase();

    // Safely format the date
    let formattedDate;
    try {
      formattedDate = new Date(departureDate).toISOString().split('T')[0];
    } catch (e) {
      return res.status(400).json({ error: 'Invalid departure date format' });
    }

    const baseOptions = {
      method: 'GET',
      params: {
        withLeg: 'true',
        direction: 'Departure',
        withCancelled: 'false',
        withCodeshared: 'true',
        withCargo: 'false',
        withPrivate: 'false',
        withLocation: 'false'
      },
      headers: {
        'x-rapidapi-key': getRapidApiKey(),
        'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
      }
    };

    // Helper function to safely isolate external API errors (429s, 404s, etc.)
    const fetchWindow = async (url) => {
      try {
        const response = await rapidAxios.request({ ...baseOptions, url });
        return response.data?.departures || [];
      } catch (err) {
        // Logs the exact RapidAPI rejection reason in your backend terminal without crashing the server
        console.warn(`[AeroDataBox Window Blocked]:`, err.response?.data || err.message);
        return [];
      }
    };

    // Fire both 12-hour windows concurrently
    const [departures1, departures2] = await Promise.all([
      fetchWindow(`https://aerodatabox.p.rapidapi.com/flights/airports/iata/${originCode}/${formattedDate}T00:00/${formattedDate}T11:59`),
      fetchWindow(`https://aerodatabox.p.rapidapi.com/flights/airports/iata/${originCode}/${formattedDate}T12:00/${formattedDate}T23:59`)
    ]);

    const allDepartures = [...departures1, ...departures2];

    // If both windows failed or returned nothing, return an empty array gracefully (Status 200)
    if (allDepartures.length === 0) return res.json([]);

    // Filter for flights matching destination
    const filteredDepartures = allDepartures.filter(flight =>
      flight.arrival?.airport?.iata === destCode
    );

    // Format the UI structure
    const formattedFlights = filteredDepartures.map((flight, index) => ({
      id: flight.number || index,
      price: { total: (Math.random() * 200 + 100).toFixed(2), currency: 'USD' },
      travelClass: 'ECONOMY',
      itineraries: [{
        duration: 'PT2H',
        segments: [{
          departure: { airport: originCode, time: flight.departure?.scheduledTimeLocal || '' },
          arrival: { airport: destCode, time: flight.arrival?.scheduledTimeLocal || '' },
          carrier: flight.airline?.name || '',
          flightNumber: flight.number || ''
        }]
      }]
    }));

    return res.json(formattedFlights);

  } catch (error) {
    console.error('Fatal Flight search error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error processing request' });
  }
};