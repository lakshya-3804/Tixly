import React , {useState} from 'react'
import { useTheme } from '../context/ThemeContext.jsx';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../components/dropdown.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001/api/flight';

const FlightLandingPage = () => {
  const navigate = useNavigate();
  const [currtab, setCurrtab] = useState(0);
  const [dateDeparture, setDateDeparture] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(new Date());
  const [showTravellers, setShowTravellers] = useState(false);
  const [airports, setAirports] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [selectedClass, setSelectedClass] = useState('All Class');
  const { isDark } = useTheme();

  const customSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: isDark ? '#1f2937' : '#ffffff', 
      color: isDark ? 'white' : '#111827',
      borderColor: state.isFocused ? '#f97316' : (isDark ? '#4b5563' : '#d1d5db'), 
      boxShadow: state.isFocused ? '0 0 0 1px #f97316' : 'none',
      width: '250px',
      fontSize: '1.1rem',
      borderRadius: '0.5rem',
      padding: '2px',
      cursor: 'text',
      transition: 'all 0.2s ease',
    }),
    singleValue: (base) => ({ ...base, color: isDark ? 'white' : '#111827' }),
    input: (base) => ({ ...base, color: isDark ? 'white' : '#111827' }), 
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? (isDark ? '#374151' : '#f3f4f6') : (isDark ? '#1f2937' : '#ffffff'),
      color: isDark ? 'white' : '#111827',
      cursor: 'pointer',
      padding: '10px 12px',
      transition: 'background-color 0.1s ease',
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? '#9ca3af' : '#6b7280',
    }),
  };

  const [travellers, setTravellers] = useState({
    infants: 0,
    kids: 0,
    adults: 1,   
    senior: 0,
  });

  const searchTimeoutRef = React.useRef(null);

  const ClassOptions = [
    'All Class', 'ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'
  ];

  const updateTraveller = (category, diff) => {
    const newCount = travellers[category] + diff
    if (newCount < 0 || newCount > 9) return
    if ((category === 'adults' || category === 'senior') && (travellers.adults + travellers.senior + diff < 1)) return
    setTravellers({
      ...travellers,
      [category]: newCount
    })
  }

  const handleAirportSearch = async (inputValue) => {
    try {
      setLoadingAirports(true);
      setError(null);
      
      if (!inputValue || typeof inputValue !== 'string') {
        return [];
      }

      const keyword = inputValue.trim();
      if (!keyword || keyword.length < 2) {
        return [];
      }
      
      const response = await axios.get(`${API_BASE_URL}/airports`, {
        params: { keyword }
      });
      
      
      if (!response.data || response.data.length === 0) {
        return [];
      }

      const formattedAirports = response.data.map(airport => {
        return {
          value: airport.iataCode,
          label: `${airport.name} (${airport.iataCode}) - ${airport.cityName}, ${airport.countryName}`
        };
      });

      setAirports(formattedAirports);
      return formattedAirports;
    } catch (error) {
      console.error('Frontend: Error searching airports:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      const details = error.response?.data?.details;
      const errorMessage = typeof details === 'object' ? (details.message || JSON.stringify(details)) : details;
      setError(errorMessage || 'Failed to search airports');
      return [];
    } finally {
      setLoadingAirports(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!selectedFrom || !selectedTo) {
        setError('Please select both departure and arrival airports');
        return;
      }

      const searchParams = {
        originLocationCode: selectedFrom.value,
        destinationLocationCode: selectedTo.value,
        departureDate: dateDeparture.toISOString().split('T')[0],
        adults: travellers.adults,
        senior: travellers.senior,
        children: travellers.kids,
        infants: travellers.infants,
        travelClass: selectedClass === 'All Class' ? '' : selectedClass,
        currency: 'USD'
      };

      if (currtab === 1) { // Round trip
        searchParams.returnDate = dateReturn.toISOString().split('T')[0];
      }


      navigate('/flight-search', { 
        state: { 
          searchParams,
          isRoundTrip: currtab === 1
        }
      });
      
    } catch (error) {
      console.error('Error preparing search:', error);
      setError('Failed to prepare search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <div className='bg-slate-900 dark:bg-slate-900 w-[90%] max-w-5xl m-auto rounded-2xl mt-10 mb-10 shadow-lg border border-slate-800 dark:border-gray-700'>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap justify-evenly text-sm font-medium text-center w-full">
                <li className="flex-1">
                    <a href="#" className={`inline-flex w-full items-center justify-center p-4 border-b-2 transition-colors ${currtab === 0 ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`} onClick={()=>setCurrtab(0)}>
                        One Way
                    </a>
                </li>
                <li className="flex-1">
                    <a href="#" className={`inline-flex w-full items-center justify-center p-4 border-b-2 transition-colors ${currtab === 1 ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`} onClick={()=>setCurrtab(1)}>
                        Round Trip
                    </a>
                </li>
                <li className="flex-1">
                    <a href="#" className={`inline-flex w-full items-center justify-center p-4 border-b-2 transition-colors ${currtab === 2 ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200'}`} onClick={()=>setCurrtab(2)}>
                        Multi City
                    </a>
                </li>
            </ul>
        </div>

        {/* ONE WAY */}
        <div className={`pb-6 w-[90%] m-auto mt-12 ${currtab === 0 ? 'block' : 'hidden'}`}>
            <div className='mt-12 mb-12'>
                <h1 className='text-3xl text-white text-center mt-8'>Book Flight Tickets</h1>
                <div className='flex flex-wrap justify-center items-center gap-4 mt-8'>

                    <Select styles={customSelectStyles} placeholder='From'
                      value={selectedFrom}
                      onChange={setSelectedFrom}
                      onInputChange={(value) => {
                        if (value) {
                          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                          searchTimeoutRef.current = setTimeout(() => {
                            handleAirportSearch(value);
                          }, 500);
                        }
                      }}
                      isLoading={loadingAirports}
                      isSearchable
                      options={airports}
                     />

                    <Select styles={customSelectStyles} placeholder='To' 
                    value={selectedTo}
                      onChange={setSelectedTo}
                      onInputChange={(value) => {
                        if (value) {
                          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                          searchTimeoutRef.current = setTimeout(() => {
                            handleAirportSearch(value);
                          }, 500);
                        }
                      }}
                      isLoading={loadingAirports}
                      isSearchable
                      options={airports}
                    />


                  <div className="flex relative">
                      <svg
                        className="absolute left-3 top-[15px] z-10 w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    <DatePicker
                      selected={dateDeparture}
                      onChange={(dateDeparture) => setDateDeparture(dateDeparture)}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                      placeholderText="Departure"
                      dateFormat="dd/MM/yyyy"
                      className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>

                  <Dropdown
                    options={ClassOptions}
                    value={selectedClass}
                    onChange={(option) => setSelectedClass(option.value)}
                    placeholder="Select an option"
                    className="custom-dropdown"
                  />
                  <div className="relative">
                    <button
                        onClick={() => setShowTravellers(!showTravellers)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-2.5 rounded-lg text-xl w-64 text-left shadow-sm"
                    >
                        {`Travellers`}
                    </button>
                    {showTravellers && (
                        <div className="absolute bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 p-4 mt-2 shadow-lg z-10 rounded-lg w-64">
                        {[
                            { key: 'infants', label: 'Infants (0-2)' },
                            { key: 'kids', label: 'Kids (3-12)' },
                            { key: 'adults', label: 'Adults (13-59)' },
                            { key: 'senior', label: 'Senior Citizens (60+)' }
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between mb-2">
                            <span>{item.label}</span>
                            <div>
                                <button
                                onClick={() => updateTraveller(item.key, -1)}
                                className="px-2 border disabled:opacity-50"
                                disabled={
                                    travellers[item.key] === 0 ||
                                    ((item.key === 'adults' || item.key === 'senior') &&
                                    travellers.adults + travellers.senior === 1)
                                }
                                >
                                -
                                </button>
                                <span className="mx-2">{travellers[item.key]}</span>
                                <button
                                onClick={() => updateTraveller(item.key, 1)}
                                className="px-2 border disabled:opacity-50"
                                disabled={travellers[item.key] === 9}
                                >
                                +
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>

            {error && (
              <div className="w-full text-red-500 text-center mt-4">
                {error}
              </div>
            )}

            <div className='flex justify-center items-center mt-4'>
                <button 
                  className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {searchResults && (
              <div className="w-full mt-8">
                <h2 className="text-2xl text-white mb-4">Available Flights</h2>
                <div className="space-y-4">
                  {searchResults.filter(flight => {
                    const firstSegment = flight.itineraries[0].segments[0];
                    const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
                    return firstSegment.departure.airport === selectedFrom.value && 
                           lastSegment.arrival.airport === selectedTo.value;
                  }).map((flight) => (
                    <div key={flight.id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">
                            {flight.itineraries[0].segments[0].departure.airport} → {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport}
                          </p>
                          <p className="text-gray-400">
                            {new Date(flight.itineraries[0].segments[0].departure.time).toLocaleTimeString()} - 
                            {new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.time).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-xl">
                            {flight.price.currency} {flight.price.total}
                          </p>
                          <p className="text-gray-400">
                            {flight.itineraries[0].duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

        </div>
        {/* ROUND TRIP */}
        <div className={`pb-6 w-[90%] m-auto mt-12 ${currtab === 1 ? 'block' : 'hidden'}`}>
            <div className='mt-12 mb-12'>
                <h1 className='text-3xl text-white text-center mt-8'>Book Flight Tickets</h1>
                <div className='flex flex-wrap justify-center items-center gap-4 mt-8'>

                    <Select styles={customSelectStyles} placeholder='From' />

                    <Select styles={customSelectStyles} placeholder='To' />


                  <div className="flex relative">
                      <svg
                        className="absolute left-3 top-[15px] z-10 w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    <DatePicker
                      selected={dateDeparture}
                      onChange={(dateDeparture) => setDateDeparture(dateDeparture)}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                      placeholderText="Departure"
                      dateFormat="dd/MM/yyyy"
                      className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex relative">
                      <svg
                        className="absolute left-3 top-[15px] z-10 w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    <DatePicker
                      selected={dateReturn}
                      onChange={(dateReturn) => setDateReturn(dateReturn)}
                      minDate={dateDeparture}
                      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                      placeholderText="Return"
                      dateFormat="dd/MM/yyyy"
                      className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>

                  <Dropdown
                    options={ClassOptions}
                    value={selectedClass}
                    onChange={(option) => setSelectedClass(option.value)}
                    placeholder="Select an option"
                    className="custom-dropdown"
                  />
                  <div className="relative">
                    <button
                        onClick={() => setShowTravellers(!showTravellers)}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-2.5 rounded-lg text-xl w-64 text-left shadow-sm"
                    >
                        {`Travellers`}
                    </button>
                    {showTravellers && (
                        <div className="absolute bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 p-4 mt-2 shadow-lg z-10 rounded-lg w-64">
                        {[
                            { key: 'infants', label: 'Infants (0-2)' },
                            { key: 'kids', label: 'Kids (3-12)' },
                            { key: 'adults', label: 'Adults (13-59)' },
                            { key: 'senior', label: 'Senior Citizens (60+)' }
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between mb-2">
                            <span>{item.label}</span>
                            <div>
                                <button
                                onClick={() => updateTraveller(item.key, -1)}
                                className="px-2 border disabled:opacity-50"
                                disabled={
                                    travellers[item.key] === 0 ||
                                    ((item.key === 'adults' || item.key === 'senior') &&
                                    travellers.adults + travellers.senior === 1)
                                }
                                >
                                -
                                </button>
                                <span className="mx-2">{travellers[item.key]}</span>
                                <button
                                onClick={() => updateTraveller(item.key, 1)}
                                className="px-2 border disabled:opacity-50"
                                disabled={travellers[item.key] === 9}
                                >
                                +
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center mt-4'>
                <button onClick={handleSearch} className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1'>
                  Search
                </button>
            </div>

        </div>
        
        {/* MULTI CITY */}
        <div className={`pb-6 w-[90%] m-auto mt-12 ${currtab === 2 ? 'block' : 'hidden'}`}>
            <div className='mt-12 mb-12 flex flex-col items-center justify-center min-h-[300px]'>
                <h1 className='text-4xl text-orange-400 font-bold mb-4'>Coming Soon!</h1>
                <p className='text-gray-300 text-xl text-center max-w-2xl'>We are currently partnering with major airlines to bring you the best multi-city booking experience. Check back soon for updates!</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default FlightLandingPage
