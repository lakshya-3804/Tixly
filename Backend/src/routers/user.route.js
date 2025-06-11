// user.router.js
import express from 'express'
import axios from 'axios'
const router = express.Router()



// Proxy endpoint for station search
router.post('/stations', async (req, res) => {
  try {
    const { search } = req.body
    if (!search) return res.status(400).json({ error: 'Missing search term' })
    const response = await axios.post(
      'https://rstations.p.rapidapi.com/v1/railways/stations/india',
      { search },
      {
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

export default router
