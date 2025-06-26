import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const getTravelerList = (counts) => {
  if (!counts) return [{ type: 'Adult', name: '', age: '', gender: '', email: '', phone: '' }];
  const list = [];
  const add = (n, type) => {
    for (let i = 0; i < n; i++) list.push({ type, name: '', age: '', gender: '', email: '', phone: '' });
  };
  add(counts.adults || 0, 'Adult');
  add(counts.senior || 0, 'Senior');
  add(counts.children || counts.kids || 0, 'Child');
  add(counts.infants || 0, 'Infant');
  return list.length ? list : [{ type: 'Adult', name: '', age: '', gender: '', email: '', phone: '' }];
};

// Age bounds for each traveler type
const AGE_BOUNDS = {
  Infant: { min: 0, max: 2 },
  Child: { min: 3, max: 12 },
  Adult: { min: 13, max: 59 },
  Senior: { min: 60, max: 120 },
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10,15}$/.test(phone);
const validateName = (name) => name.trim().length > 1;

const FlightBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;
  const travelerCounts = location.state?.travelerCounts;

  const [travelers, setTravelers] = React.useState(() => getTravelerList(travelerCounts));
  const [errors, setErrors] = React.useState([]);
  const [formTouched, setFormTouched] = React.useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">No flight selected.</div>
      </div>
    );
  }

  const handleTravelerChange = (idx, e) => {
    const updated = travelers.map((trav, i) =>
      i === idx ? { ...trav, [e.target.name]: e.target.value } : trav
    );
    setTravelers(updated);
  };

  const validateAll = () => {
    const newErrors = travelers.map((traveler) => {
      const bounds = AGE_BOUNDS[traveler.type] || { min: 0, max: 120 };
      const age = parseInt(traveler.age, 10);
      return {
        name: !validateName(traveler.name) ? 'Please enter a valid name.' : '',
        email: !validateEmail(traveler.email) ? 'Please enter a valid email.' : '',
        phone: !validatePhone(traveler.phone) ? 'Please enter a valid phone number.' : '',
        age: isNaN(age) || age < bounds.min || age > bounds.max ? `Age must be between ${bounds.min} and ${bounds.max}.` : '',
        gender: !traveler.gender ? 'Please select gender.' : '',
      };
    });
    setErrors(newErrors);
    return newErrors.every(err => Object.values(err).every(v => !v));
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setFormTouched(true);
    if (validateAll()) {
      navigate('/flight-review', { state: { flight, travelers } });
    }
  };

  const handleDecline = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if (formTouched) validateAll();
    // eslint-disable-next-line
  }, [travelers]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Flight Summary */}
        <h2 className="text-2xl text-white mb-4">Flight Details</h2>
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

        {/* Traveler Info Form */}
        <h3 className="text-xl text-white mb-2">Traveler Information</h3>
        <form className="space-y-6 mb-6" onSubmit={handleAccept} noValidate>
          {travelers.map((traveler, idx) => {
            const bounds = AGE_BOUNDS[traveler.type] || { min: 0, max: 120 };
            const err = errors[idx] || {};
            return (
              <div key={idx} className="relative bg-gray-700 p-4 rounded mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-orange-400 font-semibold">{traveler.type} {(() => {
                    let count = 0;
                    for (let i = 0; i <= idx; i++) if (travelers[i].type === traveler.type) count++;
                    return count;
                  })()}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Full Name</label>
                    <input type="text" name="name" value={traveler.name} onChange={e => handleTravelerChange(idx, e)} className={`w-full p-2 rounded bg-gray-600 text-white ${err.name ? 'border border-red-500' : ''}`} required />
                    {err.name && <div className="text-red-400 text-xs mt-1">{err.name}</div>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Age</label>
                    <input type="number" name="age" value={traveler.age} onChange={e => handleTravelerChange(idx, e)} className={`w-full p-2 rounded bg-gray-600 text-white ${err.age ? 'border border-red-500' : ''}`} required min={bounds.min} max={bounds.max} />
                    <span className="text-xs text-gray-400">({bounds.min} - {bounds.max} years)</span>
                    {err.age && <div className="text-red-400 text-xs mt-1">{err.age}</div>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Gender</label>
                    <select name="gender" value={traveler.gender} onChange={e => handleTravelerChange(idx, e)} className={`w-full p-2 rounded bg-gray-600 text-white ${err.gender ? 'border border-red-500' : ''}`} required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {err.gender && <div className="text-red-400 text-xs mt-1">{err.gender}</div>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Email</label>
                    <input type="email" name="email" value={traveler.email} onChange={e => handleTravelerChange(idx, e)} className={`w-full p-2 rounded bg-gray-600 text-white ${err.email ? 'border border-red-500' : ''}`} required />
                    {err.email && <div className="text-red-400 text-xs mt-1">{err.email}</div>}
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Phone</label>
                    <input type="tel" name="phone" value={traveler.phone} onChange={e => handleTravelerChange(idx, e)} className={`w-full p-2 rounded bg-gray-600 text-white ${err.phone ? 'border border-red-500' : ''}`} required />
                    {err.phone && <div className="text-red-400 text-xs mt-1">{err.phone}</div>}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex gap-4 justify-end">
            <button type="button" onClick={handleDecline} className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Decline</button>
            <button type="submit" className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Accept & Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightBookingPage; 