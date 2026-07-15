import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrainReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, classType, fare, traveler } = location.state || {};

  if (!train || !traveler) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Missing booking information.</div>
      </div>
    );
  }

  const handleConfirm = () => {
    navigate('/payment', { 
      state: { 
        amount: fare, 
        bookingType: 'Train',
        bookingDetails: { train, classType, traveler }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white mb-4">Review & Confirm Train Booking</h2>
        <div className="bg-gray-700 p-4 rounded mb-6 flex flex-col gap-2">
          <div className="flex justify-between text-lg text-white">
            <span>{train.train_name} ({train.train_number})</span>
            <span className="text-orange-400 font-bold">₹{fare}</span>
          </div>
          <div className="text-gray-300">
            {train.from} ({train.from_std}) → {train.to} ({train.to_std})
          </div>
          <div className="text-gray-400 text-sm">
            Class: <span className="text-orange-400">{classType}</span> | Duration: {train.duration} hr
          </div>
        </div>

        <h3 className="text-xl text-white mb-2">Traveler Details</h3>
        <div className="bg-gray-700 p-4 rounded mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
            <div><span className="font-semibold">Name:</span> {traveler.name}</div>
            <div><span className="font-semibold">Age:</span> {traveler.age}</div>
            <div><span className="font-semibold">Gender:</span> {traveler.gender}</div>
            <div><span className="font-semibold">Email:</span> {traveler.email}</div>
            <div><span className="font-semibold">Phone:</span> {traveler.phone}</div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Go Back</button>
          <button type="button" onClick={handleConfirm} className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default TrainReviewPage;
