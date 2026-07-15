import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10,15}$/.test(phone);
const validateName = (name) => name.trim().length > 1;

const TrainBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, classType, fare } = location.state || {};

  const [traveler, setTraveler] = useState({ name: '', age: '', gender: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  if (!train) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">No train selected.</div>
      </div>
    );
  }

  const handleChange = (e) => {
    setTraveler({ ...traveler, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {
      name: !validateName(traveler.name) ? 'Valid name required' : '',
      email: !validateEmail(traveler.email) ? 'Valid email required' : '',
      phone: !validatePhone(traveler.phone) ? 'Valid phone required' : '',
      age: !traveler.age || isNaN(traveler.age) || traveler.age < 1 || traveler.age > 120 ? 'Valid age required' : '',
      gender: !traveler.gender ? 'Gender required' : '',
    };
    setErrors(err);
    return Object.values(err).every(v => !v);
  };

  const handleAccept = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/train-review', { state: { train, classType, fare, traveler } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white mb-4">Train Details</h2>
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

        <h3 className="text-xl text-white mb-2">Traveler Information</h3>
        <form className="space-y-6" onSubmit={handleAccept} noValidate>
          <div className="bg-gray-700 p-4 rounded mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input type="text" name="name" value={traveler.name} onChange={handleChange} className={`w-full p-2 rounded bg-gray-600 text-white ${errors.name ? 'border border-red-500' : ''}`} required />
              {errors.name && <div className="text-red-400 text-xs mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Age</label>
              <input type="number" name="age" value={traveler.age} onChange={handleChange} className={`w-full p-2 rounded bg-gray-600 text-white ${errors.age ? 'border border-red-500' : ''}`} required />
              {errors.age && <div className="text-red-400 text-xs mt-1">{errors.age}</div>}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Gender</label>
              <select name="gender" value={traveler.gender} onChange={handleChange} className={`w-full p-2 rounded bg-gray-600 text-white ${errors.gender ? 'border border-red-500' : ''}`} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="text-red-400 text-xs mt-1">{errors.gender}</div>}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input type="email" name="email" value={traveler.email} onChange={handleChange} className={`w-full p-2 rounded bg-gray-600 text-white ${errors.email ? 'border border-red-500' : ''}`} required />
              {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Phone</label>
              <input type="tel" name="phone" value={traveler.phone} onChange={handleChange} className={`w-full p-2 rounded bg-gray-600 text-white ${errors.phone ? 'border border-red-500' : ''}`} required />
              {errors.phone && <div className="text-red-400 text-xs mt-1">{errors.phone}</div>}
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Go Back</button>
            <button type="submit" className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainBookingPage;
