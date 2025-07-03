// user.router.js
import express from 'express'
import axios from 'axios'
const router = express.Router()



// Proxy endpoint for station search
router.post('/stations', async (req, res) => {
  try {
    const { search } = req.body
    if (!search) return res.status(400).json({ error: 'Missing search term' })
    const response = await axios.get(
      'https://irctc1.p.rapidapi.com/api/v1/searchStation',
      {
        params: { query: search },
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
      }
    )

    // Return exactly what RapidAPI returned
    res.json(response.data)
  } catch (err) {
    console.error('Station‐proxy error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error' });
  }
})

// trains search from one station to another
router.get('/trainbetweenstations', async (req, res) => {
  const { from, to, date} = req.query
  if (!from || !to || !date) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    const response = await axios.get(
      'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
      {
        params: { fromStationCode: from, toStationCode: to, dateOfJourney: date},
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
      }
    )

    // Return exactly what RapidAPI returned
    console.log(response.data)
    res.json(response.data)
  } catch (err) {
    console.error('Train search error:', err.response?.data || err.message);
    res.status(502).json({ error: 'Upstream service error' });
  }
});

export default router;
