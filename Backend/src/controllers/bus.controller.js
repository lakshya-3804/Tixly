import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const searchLocations = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const response = await axios.get(
      'https://sandbox.api.zuelpay.com/v1/bus/cities',
      {
        params: { search: keyword },
        headers: {
          'Authorization': `Bearer ${process.env.ZUELPAY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let cities = response.data?.data || [];
    
    // Fallback if the ZuelPay sandbox structure is different, we can just return what we got
    // Assuming Zuelpay returns an array of cities or objects with code and name
    const keywordLower = keyword.toLowerCase();
    let filteredCities = cities.filter(city => {
      const name = city.name || city.cityName || '';
      const code = city.code || city.cityId || '';
      return name.toLowerCase().includes(keywordLower) || code.toLowerCase().includes(keywordLower);
    });

    filteredCities = filteredCities.slice(0, 10);

    return res.json({ success: true, data: filteredCities.length ? filteredCities : cities });
  } catch (error) {
    console.error('Bus Location Search Error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: 'Failed to search bus locations', details: error.response?.data || error.message });
  }
};

export const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({ success: false, error: 'Origin, destination, and date are required' });
    }

    const response = await axios.get(
      'https://sandbox.api.zuelpay.com/v1/bus/search',
      {
        params: { sourceCity: from, destinationCity: to, doj: date },
        headers: {
          'Authorization': `Bearer ${process.env.ZUELPAY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({ 
      success: true, 
      data: response.data?.data || response.data || []
    });

  } catch (error) {
    console.error('Bus API Error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: 'Failed to fetch buses', details: error.response?.data || error.message });
  }
};
