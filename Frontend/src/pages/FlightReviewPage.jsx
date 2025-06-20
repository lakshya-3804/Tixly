import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlightReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, travelers } = location.state || {};

  if (!flight || !travelers) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Missing booking information.</div>
      </div>
    );
  }

  const handleConfirm = () => {
    alert('Booking confirmed!');
    // You can redirect or clear state here
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white mb-4">Review & Confirm</h2>
        {/* Flight Summary */}
        <div className="bg-gray-700 p-4 rounded mb-6 flex flex-col gap-2">
          <div className="flex justify-between text-lg text-white">
            <span>{flight.itineraries[0].segments[0].departure.airport} → {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport}</span>
            <span className="text-orange-400 font-bold">${flight.price.total}</span>
          </div>
          <div className="text-gray-300">
            {new Date(flight.itineraries[0].segments[0].departure.time).toLocaleString()} - {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.time).toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">
            Duration: {flight.itineraries[0].duration} | Stops: {flight.itineraries[0].segments.length - 1} | Class: <span className="text-orange-400">{flight.travelClass?.replace('_', ' ') || 'Economy'}</span>
          </div>
        </div>
        {/* Travelers Review */}
        <h3 className="text-xl text-white mb-2">Traveler Details</h3>
        <div className="space-y-4 mb-6">
          {travelers.map((traveler, idx) => (
            <div key={idx} className="bg-gray-700 p-4 rounded">
              <div className="text-orange-400 font-semibold mb-2">{traveler.type} {(() => {
                let count = 0;
                for (let i = 0; i <= idx; i++) if (travelers[i].type === traveler.type) count++;
                return count;
              })()}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                <div><span className="font-semibold">Name:</span> {traveler.name}</div>
                <div><span className="font-semibold">Age:</span> {traveler.age}</div>
                <div><span className="font-semibold">Gender:</span> {traveler.gender}</div>
                <div><span className="font-semibold">Email:</span> {traveler.email}</div>
                <div><span className="font-semibold">Phone:</span> {traveler.phone}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button type="button" onClick={handleBack} className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Go Back</button>
          <button type="button" onClick={handleConfirm} className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default FlightReviewPage; 