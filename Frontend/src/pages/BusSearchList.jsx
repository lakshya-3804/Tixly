import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001';

const BusSearchList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, from, to } = location.state || {};
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !date) {
      setLoading(false);
      return;
    }
    axios.get(`${API_URL}/api/bus/search`, { params: { date, from, to } })
      .then(res => {
        setBuses(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [date, from, to]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-300">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium"
      >
        ← Back
      </button>

      <h1 className="text-md sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center">
        Available Buses on <span className="text-orange-400">{date ? new Date(date).toLocaleDateString() : 'Selected Date'}</span>
      </h1>

      {loading ? (
        <div className="text-center mt-10 text-xl">Loading buses...</div>
      ) : (
        <div className="md:max-w-[90%] mx-auto space-y-4">
          {buses.map((bus) => (
          <div key={bus.id} className="bg-gray-800 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-wrap justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-bold text-orange-400">{bus.operator}</h2>
                <p className="text-sm text-gray-400">{bus.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-200">₹{bus.price}</p>
                <p className="text-xs text-green-400">{bus.seats} Seats Left</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-700 pt-3">
              <div className="text-center text-gray-200">
                <p className="font-bold">{bus.departure}</p>
                <p className="text-xs text-gray-400">Departure</p>
              </div>
              <div className="text-center text-gray-500 text-sm">
                ------- {bus.duration} -------
              </div>
              <div className="text-center text-gray-200">
                <p className="font-bold">{bus.arrival}</p>
                <p className="text-xs text-gray-400">Arrival</p>
              </div>
              
              <button
                onClick={() => navigate('/bus-booking', { state: { bus } })}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Select Seats
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default BusSearchList;
