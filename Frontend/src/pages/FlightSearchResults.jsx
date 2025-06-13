import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/flight';

const FlightSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    airlines: [],
    stops: 'all',
    duration: 'all'
  });

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const { searchParams } = location.state;
        const response = await axios.get(`${API_BASE_URL}/search`, { params: searchParams });
        setFlights(response.data);
      } catch (error) {
        setError('Failed to fetch flight results. Please try again.');
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.searchParams) {
      fetchFlights();
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sortedFlights = [...flights].sort((a, b) => {
      switch (criteria) {
        case 'price':
          return parseFloat(a.price.total) - parseFloat(b.price.total);
        case 'duration':
          return a.itineraries[0].duration.localeCompare(b.itineraries[0].duration);
        case 'departure':
          return new Date(a.itineraries[0].segments[0].departure.time) - 
                 new Date(b.itineraries[0].segments[0].departure.time);
        default:
          return 0;
      }
    });
    setFlights(sortedFlights);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredFlights = flights.filter(flight => {
    const price = parseFloat(flight.price.total);
    const stops = flight.itineraries[0].segments.length - 1;
    const duration = flight.itineraries[0].duration;

    return (
      price >= filters.priceRange.min &&
      price <= filters.priceRange.max &&
      (filters.stops === 'all' || 
       (filters.stops === 'nonstop' && stops === 0) ||
       (filters.stops === '1stop' && stops === 1) ||
       (filters.stops === '2plus' && stops >= 2))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading flight results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-white text-xl mb-4">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-4">
              <h3 className="text-gray-300 mb-2">Price Range (USD)</h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange.max}
                onChange={(e) => handleFilter('priceRange', { ...filters.priceRange, max: e.target.value })}
                className="w-full"
              />
              <div className="text-gray-400 text-sm">
                $0 - ${filters.priceRange.max}
              </div>
            </div>

            {/* Stops */}
            <div className="mb-4">
              <h3 className="text-gray-300 mb-2">Stops</h3>
              <select
                value={filters.stops}
                onChange={(e) => handleFilter('stops', e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-2"
              >
                <option value="all">All</option>
                <option value="nonstop">Non-stop</option>
                <option value="1stop">1 Stop</option>
                <option value="2plus">2+ Stops</option>
              </select>
            </div>
          </div>

          {/* Flight Results */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => handleSort('price')}
                  className={`px-4 py-2 rounded ${
                    sortBy === 'price' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Price
                </button>
                <button
                  onClick={() => handleSort('duration')}
                  className={`px-4 py-2 rounded ${
                    sortBy === 'duration' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Duration
                </button>
                <button
                  onClick={() => handleSort('departure')}
                  className={`px-4 py-2 rounded ${
                    sortBy === 'departure' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Departure Time
                </button>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <div key={flight.id} className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-white text-xl">
                            {flight.itineraries[0].segments[0].departure.airport} → 
                            {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport}
                          </p>
                          <p className="text-gray-400">
                            {new Date(flight.itineraries[0].segments[0].departure.time).toLocaleTimeString()} - 
                            {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.time).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-gray-400">
                          {flight.itineraries[0].duration}
                          <br />
                          {flight.itineraries[0].segments.length - 1} {flight.itineraries[0].segments.length - 1 === 1 ? 'stop' : 'stops'}
                          <br />
                          <span className="text-orange-500">
                            {flight.travelClass?.replace('_', ' ') || 'Economy'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-2xl">
                        ${flight.price.total}
                      </p>
                      <button className="mt-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults; 