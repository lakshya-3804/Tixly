import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieSeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, theatre, time, date } = location.state || {};
  
  // 10 columns, 8 rows for simple grid
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // Randomly pre-book some seats to make it realistic
  const [bookedSeats] = useState(new Set(['C4', 'C5', 'F8', 'F9', 'F10', 'H6', 'H7', 'B12']));
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  if (!movie) return <div className="text-white text-center mt-10">Missing Details</div>;

  const toggleSeat = (seatId) => {
    if (bookedSeats.has(seatId)) return;
    
    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seatId)) {
      newSelected.delete(seatId);
    } else {
      if (newSelected.size >= 10) {
        alert("You can only select up to 10 seats.");
        return;
      }
      newSelected.add(seatId);
    }
    setSelectedSeats(newSelected);
  };

  const handlePay = () => {
    if (selectedSeats.size === 0) return;
    navigate('/payment', {
      state: {
        amount: selectedSeats.size * theatre.price,
        bookingType: 'Movie',
        bookingDetails: {
          movie,
          theatre: theatre.name,
          time,
          date,
          seats: Array.from(selectedSeats)
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-12 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 sticky top-0 z-10 flex justify-between items-center px-8">
        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-400">{theatre.name} | {new Date(date).toLocaleDateString()} | {time}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">{selectedSeats.size} Tickets</p>
          <p className="font-bold text-orange-400 text-xl">₹{selectedSeats.size * theatre.price}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-4 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Screen curve graphic */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-[80%] h-4 border-t-2 border-orange-500 rounded-[100%] shadow-[0_-10px_20px_rgba(249,115,22,0.3)]"></div>
            <p className="text-gray-500 text-sm mt-2 tracking-widest uppercase">All eyes this way</p>
          </div>

          {/* Seat Grid */}
          <div className="flex flex-col items-center gap-4">
            {rows.map((row) => (
              <div key={row} className="flex gap-2 items-center">
                <span className="text-gray-500 w-6 font-mono">{row}</span>
                <div className="flex gap-2">
                  {columns.map((col) => {
                    const seatId = `${row}${col}`;
                    const isBooked = bookedSeats.has(seatId);
                    const isSelected = selectedSeats.has(seatId);
                    
                    // Add aisle gaps
                    const isAisle = col === 4 || col === 8;

                    return (
                      <div key={seatId} className={`flex ${isAisle ? 'mr-6' : ''}`}>
                        <button
                          onClick={() => toggleSeat(seatId)}
                          disabled={isBooked}
                          className={`w-8 h-8 rounded-t-lg rounded-b-sm text-xs font-mono transition-all
                            ${isBooked ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600' : 
                              isSelected ? 'bg-orange-500 text-white border-2 border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.6)] scale-110' : 
                              'border border-green-500 text-transparent hover:bg-green-500 hover:text-white hover:scale-105'}
                          `}
                        >
                          {col}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center gap-2"><div className="w-6 h-6 border border-green-500 rounded"></div> <span className="text-sm text-gray-400">Available</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-orange-500 rounded"></div> <span className="text-sm text-gray-400">Selected</span></div>
            <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-700 rounded border border-gray-600"></div> <span className="text-sm text-gray-400">Sold</span></div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Pay Button */}
      {selectedSeats.size > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 flex justify-center shadow-2xl">
          <button 
            onClick={handlePay}
            className="w-full max-w-md bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-lg"
          >
            Pay ₹{selectedSeats.size * theatre.price}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSeatSelection;
