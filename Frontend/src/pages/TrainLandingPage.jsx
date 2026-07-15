import { useState, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import '../components/dropdown.css'
import debounce from 'lodash.debounce'

import trainimg from '../assets/icons8-train-50.png'
import calimg from '../assets/icons8-calender-50.png'
import statimg from '../assets/icons8-status-50.png'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3001'

const TrainLandingPage = () => {
  const [scheduleTrainNo, setScheduleTrainNo] = useState('')
  const [scheduleData, setScheduleData] = useState(null)
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const [statusTrainNo, setStatusTrainNo] = useState('')
  const [statusData, setStatusData] = useState(null)
  const [statusLoading, setStatusLoading] = useState(false)

  const [currtab, setCurrtab] = useState(0)
  const [date, setDate] = useState(new Date())
  const [fromStation, setFromStation] = useState(null)
  const [toStation, setToStation] = useState(null)
  const navigate = useNavigate();

  const classOptions = [
    'ALL Class', 'Sleeper Class', 'Third AC', 'Second AC', 'First AC', 'General Class', 'AC Chair Car'
  ]

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

  const fetchStations = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const res = await axios.post(`${API_URL}/api/train/stations`, {
        search: inputValue,
      });
      const stations = res.data?.data || [];
      return stations.map((stn) => ({
        label: `${stn.name} (${stn.code})`,
        value: stn.code,
      }));
    } catch (err) {
      console.error("Error fetching stations:", err);
      return [];
    }
  };

  const loadOptions = useMemo(
    () =>
      debounce((inputValue, callback) => {
        if (inputValue.length < 2) {
          callback([])
          return
        }
        fetchStations(inputValue).then(callback).catch(() => callback([]))
      }, 1000), // 1 second debounce
    []
  )

  const handleScheduleSearch = async () => {
    if (!scheduleTrainNo) return;
    setScheduleLoading(true);
    setScheduleData(null);
    try {
      const res = await axios.get(`${API_URL}/api/train/schedule`, { params: { trainNumber: scheduleTrainNo } });
      setScheduleData(res.data.data);
    } catch (err) {
      alert("Failed to load train schedule. Ensure the Train No is valid.");
    }
    setScheduleLoading(false);
  };

  const handleStatusSearch = async () => {
    if (!statusTrainNo) return;
    setStatusLoading(true);
    setStatusData(null);
    try {
      const res = await axios.get(`${API_URL}/api/train/status`, { params: { trainNumber: statusTrainNo } });
      setStatusData(res.data.data);
    } catch (err) {
      alert("Failed to load live status. Ensure the Train No is valid.");
    }
    setStatusLoading(false);
  };

  const handleTrainSearch = async () => {
    if (!fromStation || !toStation || !date) {
      alert('Please select both stations and a date.')
      return
    }
    const from = fromStation.value
    const to = toStation.value
    const dt = date.toISOString().split('T')[0]
    try {
      const response = await axios.get(`${API_URL}/api/train/trainbetweenstations`, {
        params: {
          from,
          to,
          date: dt
        }
      })
      navigate('/train-search', {
        state: {
          data: response.data,
          fromStation: fromStation,
          toStation: toStation,
          date: dt
        }
      });
    } catch (error) {
      console.error('Error fetching train data:', error)
      alert('Failed to fetch train data. Please try again later.')
    }
  }


  

  

  return (
    <div className="min-h-full">
      <div className="bg-slate-900 dark:bg-slate-900 w-[90%] max-w-5xl m-auto rounded-2xl mt-10 mb-10 shadow-lg border border-slate-800 dark:border-gray-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex justify-evenly text-sm font-medium text-center">
            {['Book Train Tickets', 'Check Train Schedule', 'Check Running Status'].map((label, idx) => (
              <li key={idx} className="flex-1">
                <a
                  href="#"
                  className={`inline-flex w-full items-center justify-center gap-1 p-4 border-b-2 transition-colors ${
                    currtab === idx
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                  onClick={() => setCurrtab(idx)}
                >
                  <img className="w-4 h-4" src={[trainimg, calimg, statimg][idx]} alt="icon" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        {currtab === 0 && (
          <div className="pb-6 w-[90%] m-auto mt-12">
            <h1 className="text-3xl text-white text-center mt-8">Book Train Tickets</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions= {true}
                value={fromStation}
                onChange={setFromStation}
                placeholder="From"
                styles={customSelectStyles}
              />

              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                value={toStation}
                onChange={setToStation}
                placeholder="To"
                styles={customSelectStyles}
              />

              <div className="flex relative">
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  minDate={new Date()}
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                  className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <svg
                  className="absolute left-3 top-[15px] w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>

              <Dropdown
                options={classOptions}
                value={classOptions[0]}
                placeholder="Select an option"
                className="custom-dropdown"
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button onClick={handleTrainSearch} className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1'>
                Search
              </button>
            </div>
          </div>
        )}

        {currtab === 1 && (
          <div className="pb-6 mt-12 px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl text-white text-center mb-6">Train Schedule</h1>
            <div className="flex gap-4 mb-8">
              <input type="text" placeholder="Train No (e.g., 12050)" value={scheduleTrainNo} onChange={(e) => setScheduleTrainNo(e.target.value)} className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              <button onClick={handleScheduleSearch} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1">
                {scheduleLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {scheduleData && (
              <div className="mt-8 bg-gray-800 dark:bg-gray-800 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-orange-400 mb-2">{scheduleData.train_name} ({scheduleData.train_number})</h2>
                <div className="mt-4 space-y-4">
                  {scheduleData.route?.map((stop, i) => (
                    <div key={i} className="flex justify-between items-center text-sm text-gray-300 border-b border-gray-700 pb-2">
                      <div className="font-bold w-1/3">{stop.station_name}</div>
                      <div className="w-1/3 text-center">Arr: <span className="text-green-400">{stop.sta || 'Source'}</span></div>
                      <div className="w-1/3 text-right">Dep: <span className="text-red-400">{stop.std || 'Destination'}</span></div>
                    </div>
                  ))}
                  {(!scheduleData.route || scheduleData.route.length === 0) && <p className="text-gray-400">No schedule data available.</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {currtab === 2 && (
          <div className="pb-6 mt-12 px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl text-white text-center mb-6">Live Train Status</h1>
            <div className="flex gap-4 mb-8">
              <input type="text" placeholder="Train No" value={statusTrainNo} onChange={(e) => setStatusTrainNo(e.target.value)} className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              <button onClick={handleStatusSearch} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1">
                {statusLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {statusData && (
              <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                 <h2 className="text-xl font-bold text-orange-400 mb-2">{statusData.train_name} ({statusData.train_number})</h2>
                 <p className="text-lg text-gray-800 dark:text-gray-300">Current Station: <span className="font-semibold text-gray-900 dark:text-white">{statusData.current_station_name || 'N/A'}</span></p>
                 <p className="text-lg text-gray-800 dark:text-gray-300">Status: <span className="text-green-600 dark:text-green-400 font-semibold">{statusData.status || 'Running normally'}</span></p>
                 <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Note: Live tracking data might be delayed by a few minutes depending on IRCTC servers.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrainLandingPage
