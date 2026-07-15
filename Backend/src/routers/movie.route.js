import express from 'express';

const router = express.Router();

const MOVIES = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi, Thriller', rating: '4.8', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60', duration: '2h 28m', language: 'English', format: 'IMAX 2D' },
  { id: 2, title: 'The Dark Knight', genre: 'Action, Crime', rating: '4.9', image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop&q=60', duration: '2h 32m', language: 'English', format: '2D, IMAX' },
  { id: 3, title: 'Interstellar', genre: 'Adventure, Sci-Fi', rating: '4.7', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&auto=format&fit=crop&q=60', duration: '2h 49m', language: 'English, Hindi', format: 'IMAX 2D' },
  { id: 4, title: 'Dune: Part Two', genre: 'Action, Sci-Fi', rating: '4.8', image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&auto=format&fit=crop&q=60', duration: '2h 46m', language: 'English', format: '3D, IMAX 3D' },
  { id: 5, title: 'Avatar', genre: 'Action, Sci-Fi', rating: '4.5', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60', duration: '2h 42m', language: 'English, Hindi, Tamil', format: '3D, 4DX' },
];

const MOCK_THEATRES = [
  { id: 101, name: 'PVR: Nexus Mall, Koramangala', showtimes: ['10:30 AM', '01:15 PM', '04:30 PM', '08:00 PM', '10:45 PM'], price: 350 },
  { id: 102, name: 'INOX: Mantri Square, Malleshwaram', showtimes: ['11:00 AM', '02:00 PM', '06:15 PM', '09:30 PM'], price: 300 },
  { id: 103, name: 'Cinepolis: Orion Mall, Rajajinagar', showtimes: ['09:45 AM', '12:30 PM', '03:45 PM', '07:20 PM', '10:10 PM'], price: 400 },
];

router.get('/now-showing', (req, res) => {
  setTimeout(() => {
    res.json({ success: true, data: MOVIES });
  }, 200);
});

router.get('/showtimes/:movieId', (req, res) => {
  // In a real app, query database for this specific movie's showtimes on the selected date
  setTimeout(() => {
    res.json({ success: true, data: MOCK_THEATRES });
  }, 300);
});

export default router;
