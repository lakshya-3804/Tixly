import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Simple in-memory cache for airports
const airportCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Function to get access token
async function getAccessToken() {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      `grant_type=client_credentials&client_id=${process.env.AMADEUS_API_KEY}&client_secret=${process.env.AMADEUS_API_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error.response?.data || error.message);
    throw error;
  }
}

export const searchAirports = async (req, res) => {
  try {
    const { keyword } = req.query;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    // Check cache first
    const cacheKey = keyword.toLowerCase();
    const cachedResult = airportCache.get(cacheKey);
    if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_DURATION) {
      console.log('Serving from cache for keyword:', keyword);
      return res.json(cachedResult.data);
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Make the API request
    const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        keyword: keyword,
        subType: 'AIRPORT'
      }
    });

    if (!response.data || !response.data.data) {
      return res.json([]);
    }

    const formattedAirports = response.data.data.map(airport => ({
      iataCode: airport.iataCode,
      name: airport.name,
      cityName: airport.address?.cityName || '',
      countryName: airport.address?.countryName || ''
    }));

    // Cache the results
    airportCache.set(cacheKey, {
      data: formattedAirports,
      timestamp: Date.now()
    });

    return res.json(formattedAirports);

  } catch (error) {
    console.error('Airport search error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        details: 'Please wait a moment before trying again',
        retryAfter: error.response.headers['retry-after'] || 60
      });
    }

    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Authentication failed',
        details: 'Invalid API credentials'
      });
    }

    return res.status(500).json({ 
      error: 'Failed to search airports',
      details: error.response?.data?.errors?.[0]?.detail || error.message
    });
  }
};

export const searchFlights = async (req, res) => {
  try {
    const { 
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass
    } = req.query;

    // Validate required parameters
    if (!originLocationCode || !destinationLocationCode || !departureDate) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        details: 'Please provide origin, destination, and departure date'
      });
    }

    // Format and validate airport codes
    const originCode = originLocationCode.toUpperCase();
    const destCode = destinationLocationCode.toUpperCase();

    console.log('Searching flights:', {
      origin: originCode,
      destination: destCode,
      date: departureDate
    });

    // Validate and format travel class
    const validTravelClasses = {
      'ECONOMY': 'ECONOMY',
      'PREMIUM_ECONOMY': 'PREMIUM_ECONOMY',
      'BUSINESS': 'BUSINESS',
      'FIRST': 'FIRST',
      'ALL CLASS': ''
    };

    const formattedTravelClass = validTravelClasses[travelClass?.toUpperCase()] || 'ECONOMY';

    console.log('Travel class:', { original: travelClass, formatted: formattedTravelClass });

    // Validate and format dates
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      return date.toISOString().split('T')[0];
    };

    try {
      const formattedDepartureDate = formatDate(departureDate);
      const formattedReturnDate = returnDate ? formatDate(returnDate) : undefined;

      // Validate passenger numbers
      const numAdults = parseInt(adults) || 1;
      const numChildren = parseInt(children) || 0;
      const numInfants = parseInt(infants) || 0;

      if (numAdults < 1) {
        throw new Error('At least one adult passenger is required');
      }

      if (numAdults + numChildren + numInfants > 9) {
        throw new Error('Maximum 9 passengers allowed');
      }

      // Get access token
      const accessToken = await getAccessToken();

      // Prepare search parameters
      const searchParams = {
        originLocationCode: originCode,
        destinationLocationCode: destCode,
        departureDate: formattedDepartureDate,
        adults: numAdults,
        children: numChildren,
        infants: numInfants,
        currencyCode: 'USD',
        max: 50,
        nonStop: false
      };

      // Only add travelClass if it's not empty
      if (formattedTravelClass) {
        searchParams.travelClass = formattedTravelClass;
      }

      if (formattedReturnDate) {
        searchParams.returnDate = formattedReturnDate;
      }

      console.log('Amadeus API search params:', searchParams);

      // Make the API request
      const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: searchParams
      });

      if (!response.data || !response.data.data) {
        return res.json([]);
      }

      // Filter flights to ensure they match the exact origin and destination
      const filteredFlights = response.data.data.filter(offer => {
        return offer.itineraries.every(itinerary => {
          const segments = itinerary.segments;
          const firstSegment = segments[0];
          const lastSegment = segments[segments.length - 1];
          
          // Strict check: first segment must depart from origin and last segment must arrive at destination
          return firstSegment.departure.iataCode === originCode && 
                 lastSegment.arrival.iataCode === destCode;
        });
      });

      // If no matching flights found, return empty array
      if (filteredFlights.length === 0) {
        return res.json([]);
      }

      const formattedFlights = filteredFlights.map(offer => ({
        id: offer.id,
        price: {
          total: offer.price.total,
          currency: offer.price.currency
        },
        travelClass: offer.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'ECONOMY',
        itineraries: offer.itineraries.map(itinerary => ({
          duration: itinerary.duration,
          segments: itinerary.segments.map(segment => ({
            departure: {
              airport: segment.departure.iataCode,
              time: segment.departure.at
            },
            arrival: {
              airport: segment.arrival.iataCode,
              time: segment.arrival.at
            },
            carrier: segment.carrierCode,
            flightNumber: segment.number
          }))
        }))
      }));

      return res.json(formattedFlights);

    } catch (validationError) {
      console.error('Validation error:', validationError);
      return res.status(400).json({
        error: 'Invalid parameters',
        details: validationError.message
      });
    }

  } catch (error) {
    console.error('Flight search error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        details: 'Please wait a moment before trying again',
        retryAfter: error.response.headers['retry-after'] || 60
      });
    }

    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Authentication failed',
        details: 'Invalid API credentials'
      });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({
        error: 'Invalid search parameters',
        details: error.response.data.errors?.[0]?.detail || 'Please check your search criteria'
      });
    }

    return res.status(500).json({ 
      error: 'Failed to search flights',
      details: error.response?.data?.errors?.[0]?.detail || error.message
    });
  }
}; 