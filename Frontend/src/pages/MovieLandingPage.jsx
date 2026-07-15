import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieLandingPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/movie/now-showing')
      .then(res => {
        setMovies(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Now Showing</h1>
        
        {loading ? (
          <div className="text-center text-xl mt-10">Loading movies...</div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {movies.map(movie => (
            <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition duration-300">
              <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{movie.title}</h2>
                  <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded-md">★ {movie.rating}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{movie.genre}</p>
                <div className="text-orange-400 font-bold mb-2 text-sm">{movie.language} • {movie.format}</div>
                <button 
                  onClick={() => navigate('/movie-showtimes', { state: { movie } })}
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default MovieLandingPage;
