import React , {useState} from 'react'
import { useTheme } from '../context/ThemeContext.jsx';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../components/dropdown.css'

import axios from 'axios';

import busimg from '../assets/icons8-bus-100.png'

const API_BASE_URL = 'http://localhost:3001/api/bus';

const BusLandingPage = () => {

  const navigate = useNavigate();
  const [currtab, setCurrtab] = useState(0);
  const [date, setDate] = useState(new Date());
  
  const [locations, setLocations] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const searchTimeoutRef = React.useRef(null);
  const options = [
    'ALL Class', 'AC Sleeper','AC Seater' , 'Non-AC Sleeper' , 'Non-AC Seater'
  ];

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

  const handleLocationSearch = async (inputValue) => {
    try {
      setLoadingLocations(true);
      if (!inputValue || typeof inputValue !== 'string') return [];
      const keyword = inputValue.trim();
      if (!keyword || keyword.length < 2) return [];
      
      const response = await axios.get(`${API_BASE_URL}/locations`, {
        params: { keyword }
      });
      
      if (!response.data || !response.data.data) return [];
      
      const formattedLocations = response.data.data.map(loc => ({
        value: loc.code,
        label: `${loc.name} (${loc.code})`
      }));
      setLocations(formattedLocations);
      return formattedLocations;
    } catch (error) {
      console.error('Error searching locations:', error);
      return [];
    } finally {
      setLoadingLocations(false);
    }
  };

  return (
    <div className="min-h-full">
      <div className="bg-slate-900 dark:bg-slate-900 w-[90%] max-w-5xl m-auto rounded-2xl mt-10 mb-10 shadow-lg border border-slate-800 dark:border-gray-700">

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap justify-evenly text-sm font-medium text-center w-full">
                <li className="flex-1">
                    <a href="#" className={`inline-flex w-full items-center justify-center gap-1 p-4 border-b-2 transition-colors ${ currtab === 0 ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'}`} onClick={()=>setCurrtab(0)}>
                        <img className='w-6 h-5' src={busimg} alt="bus" />  Book Bus Tickets
                    </a>
                </li>
            </ul>
        </div>

        {/* MAIN */}
        <div className={`pb-6 w-[90%] m-auto mt-12 ${currtab === 0 ? 'block' : 'hidden'}`}>
            <div className='mt-12 mb-12'>
                <h1 className='text-3xl text-white text-center mt-8'>Book Bus Tickets</h1>
                <div className='flex flex-wrap justify-center items-center gap-4 mt-8'>

                    <Select styles={customSelectStyles} placeholder='From'
                       value={selectedFrom}
                       onChange={setSelectedFrom}
                       onInputChange={(value) => {
                         if (value) {
                           if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                           searchTimeoutRef.current = setTimeout(() => {
                             handleLocationSearch(value);
                           }, 500);
                         }
                       }}
                       isLoading={loadingLocations}
                       isSearchable
                       options={locations}
                    />

                    <Select styles={customSelectStyles} placeholder='To'
                       value={selectedTo}
                       onChange={setSelectedTo}
                       onInputChange={(value) => {
                         if (value) {
                           if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                           searchTimeoutRef.current = setTimeout(() => {
                             handleLocationSearch(value);
                           }, 500);
                         }
                       }}
                       isLoading={loadingLocations}
                       isSearchable
                       options={locations}
                    />


                  <div className='flex relative'>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} minDate={new Date()} maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))} placeholderText='Select date' dateFormat='dd/MM/yyyy' className='border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white' />
                    <svg className="absolute left-3 top-[15px] w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>

                  <Dropdown
                    options={options}
                    value={options[0]}
                    placeholder="Select an option"
                    className="custom-dropdown"
                  />

                </div>
            </div>

            <div className='flex justify-center items-center mt-4'>
                <button 
                  onClick={() => {
                    if(!selectedFrom || !selectedTo) {
                      alert("Please select both origin and destination cities.");
                      return;
                    }
                    navigate('/bus-search', { 
                      state: { 
                        date: date.toISOString(),
                        from: selectedFrom.value,
                        to: selectedTo.value
                      } 
                    })
                  }}
                  className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-1'
                >
                  Search
                </button>
            </div>

        </div>




      </div>
    </div>
  )
}

export default BusLandingPage
