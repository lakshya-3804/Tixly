import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BusBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus } = location.state || {};

  const [passenger, setPassenger] = useState({ name: '', age: '', gender: '' });

  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">No bus selected.</div>
      </div>
    );
  }

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!passenger.name || !passenger.age || !passenger.gender) {
      alert("Please fill all details");
      return;
    }
    navigate('/payment', { 
      state: { 
        amount: bus.price, 
        bookingType: 'Bus',
        bookingDetails: { bus, passenger }
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white mb-4">Complete Your Booking</h2>
        
        <div className="bg-gray-700 p-4 rounded mb-6">
          <div className="flex justify-between text-lg text-white mb-2">
            <span className="font-bold text-orange-400">{bus.operator}</span>
            <span>₹{bus.price}</span>
          </div>
          <div className="text-gray-300 flex justify-between">
            <span>{bus.departure} → {bus.arrival}</span>
            <span>{bus.type}</span>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Passenger Name</label>
            <input type="text" value={passenger.name} onChange={e => setPassenger({...passenger, name: e.target.value})} className="w-full p-2 rounded bg-gray-600 text-white" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Age</label>
              <input type="number" value={passenger.age} onChange={e => setPassenger({...passenger, age: e.target.value})} className="w-full p-2 rounded bg-gray-600 text-white" required />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Gender</label>
              <select value={passenger.gender} onChange={e => setPassenger({...passenger, gender: e.target.value})} className="w-full p-2 rounded bg-gray-600 text-white" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 justify-end mt-6">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Pay & Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusBookingPage;
