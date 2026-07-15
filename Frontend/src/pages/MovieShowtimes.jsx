import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieShowtimes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get next 5 days
  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date
      });
    }
    return dates;
  };
  
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].date);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    axios.get(`http://localhost:3001/api/movie/showtimes/${movie.id}`)
      .then(res => {
        setTheatres(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [movie]);

  if (!movie) return <div className="text-white text-center mt-10">Movie not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      {/* Movie Header similar to BookMyShow */}
      <div className="bg-gray-800 border-b border-gray-700 p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <img src={movie.image} alt={movie.title} className="w-48 rounded-lg shadow-lg" />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
              <span className="bg-gray-700 px-3 py-1 rounded">{movie.format}</span>
              <span className="bg-gray-700 px-3 py-1 rounded">{movie.language}</span>
            </div>
            <div className="text-gray-400 mb-2">{movie.duration} • {movie.genre} • UA</div>
            <div className="text-orange-400 font-bold text-xl flex items-center gap-2">
              ★ {movie.rating}/5
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-4">
        {/* Date Selector */}
        <div className="flex gap-4 border-b border-gray-700 pb-4 mb-8 overflow-x-auto">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(d.date)}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[70px] ${
                selectedDate === d.date ? 'bg-orange-500 text-white' : 'hover:bg-gray-800 text-gray-400'
              }`}
            >
              <span className="text-xs">{d.day}</span>
              <span className="font-bold text-xl">{d.date}</span>
              <span className="text-xs">{d.month}</span>
            </button>
          ))}
        </div>

        {/* Theatres List */}
        {loading ? (
          <div className="text-white text-center text-xl mt-10">Loading showtimes...</div>
        ) : (
          <div className="space-y-6">
            {theatres.map(theatre => (
              <div key={theatre.id} className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="md:w-1/3">
                  <h3 className="text-white font-bold text-lg mb-1">{theatre.name}</h3>
                  <div className="text-gray-400 text-sm flex gap-2">
                    <span className="text-green-400">M-Ticket</span>
                    <span className="text-orange-400">Food & Beverage</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 flex-1">
                  {theatre.showtimes.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate('/movie-seat-selection', { 
                        state: { movie, theatre, time, date: dates.find(d => d.date === selectedDate).fullDate } 
                      })}
                      className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded transition font-medium"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieShowtimes;
