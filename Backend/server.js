const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Amadeus = require('amadeus');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Amadeus API client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

// Airport search endpoint
app.get('/api/airports', async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.any
    });
    res.json(response.data);
  } catch (error) {
    console.error('Airport search error:', error);
    res.status(500).json({ error: 'Failed to fetch airports' });
  }
});

// Flight search endpoint
app.get('/api/flights', async (req, res) => {
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

    const searchParams = {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      infants: parseInt(infants) || 0,
      travelClass: travelClass || 'ECONOMY',
      currencyCode: 'USD',
      max: 10
    };

    if (returnDate) {
      searchParams.returnDate = returnDate;
    }

    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);
    res.json(response.data);
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 