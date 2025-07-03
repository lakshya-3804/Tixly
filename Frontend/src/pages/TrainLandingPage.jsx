import React, { useState , useEffect, useMemo } from 'react'
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

const TrainLandingPage = () => {
  const [currtab, setCurrtab] = useState(0)
  const [date, setDate] = useState(new Date())
  const [fromStation, setFromStation] = useState(null)
  const [toStation, setToStation] = useState(null)
  const navigate = useNavigate();

  const classOptions = [
    'ALL Class', 'Sleeper Class', 'Third AC', 'Second AC', 'First AC', 'General Class', 'AC Chair Car'
  ]

  // Fetch stations from RapidAPI
  const fetchStations = async (inputValue) => {
    if (!inputValue) return [];
    try {
      console.log("Fetching stations for:", inputValue);
      const res = await axios.post("http://localhost:3001/api/train/stations", {
        search: inputValue,
      });
      if(res.data.length === 0) {
        console.warn("No stations found for:", inputValue);
        return [];
      }
      return res.data.data.map((stn) => ({
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
          // immediately return empty list
          callback([])
          return
        }
        fetchStations(inputValue).then(callback).catch(() => callback([]))
      }, 1000), // 1 second debounce
    []
  )

  const handleTrainSearch = async () => {
    if (!fromStation || !toStation || !date) {
      alert('Please select both stations and a date.')
      return
    }
    // fromcode and tocode are the station codes
    // pass fromstationcode in from and tostationcode in to
    const from = fromStation.value
    const to = toStation.value
    const dt = date.toISOString().split('T')[0]
    console.log(`Searching trains from ${from} to ${to} on ${dt}`)
    try {
      const response = await axios.get(`http://localhost:3001/api/train/trainbetweenstations`, {
        params: {
          from,
          to,
          date: dt
        }
      })
      // console.log('Train search results:', response.data)
      navigate('/train-search', {
        state: {
          data: response.data,
          fromStation: fromStation,
          toStation: toStation,
          date: dt
        }
      });
      // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching train data:', error)
      alert('Failed to fetch train data. Please try again later.')
    }
  }


  

  

  return (
    <div>
      <div className="bg-gray-900 w-[80%] m-auto rounded-lg mt-12">
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <ul className="flex justify-evenly text-sm font-medium text-center text-gray-400 w-full">
            {['Book Train Tickets', 'Check Train Schedule', 'Check Running Status'].map((label, idx) => (
              <li key={idx} className="me-2">
                <a
                  href="#"
                  className={`inline-flex items-center p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300 ${currtab === idx ? 'border-white text-white' : ''}`}
                  onClick={() => setCurrtab(idx)}
                >
                  <img className="w-4 h-4 mr-1" src={[trainimg, calimg, statimg][idx]} alt="icon" /> {label}
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
                styles={{
                  control: base => ({ ...base, backgroundColor: '#374151', borderColor: '#4b5563', width: '250px', fontSize: '1.2rem', borderRadius: '0.375rem' }),
                  singleValue: s => ({ ...s, color: 'white' }),
                  input: i => ({ ...i, color: 'white' }),
                  menu: m => ({ ...m, backgroundColor: '#374151' }),
                  option: o => ({ ...o, color: 'white', backgroundColor: '#374151' })
                }}
              />

              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                value={toStation}
                onChange={setToStation}
                placeholder="To"
                styles={{
                  control: base => ({ ...base, backgroundColor: '#374151', borderColor: '#4b5563', width: '250px', fontSize: '1.2rem', borderRadius: '0.375rem' }),
                  singleValue: s => ({ ...s, color: 'white' }),
                  input: i => ({ ...i, color: 'white' }),
                  menu: m => ({ ...m, backgroundColor: '#374151' }),
                  option: o => ({ ...o, color: 'white', backgroundColor: '#374151' })
                }}
              />

              <div className="flex relative">
                <DatePicker
                  selected={date}
                  onChange={setDate}
                  minDate={new Date()}
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                  className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-gray-700 border-gray-600 text-white"
                />
                <svg
                  className="absolute left-3 top-[15px] w-4 h-4 text-gray-400"
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
              <button onClick={handleTrainSearch} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Search
              </button>
            </div>
          </div>
        )}

        {currtab === 1 && (
          <div className="pb-6 mt-12">
            <h1 className="text-3xl text-white text-center mt-8">Train Schedule</h1>
            <div className="flex justify-center items-center gap-[50px] mt-8 mb-12">
              <Select
                styles={{ control: base => ({ ...base, backgroundColor: '#374151', color: 'white', borderColor: '#4b5563', width: '250px', fontSize: '1.2rem' }) }}
                placeholder="Train No./Name"
              />
              <button className="bg-orange-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-orange-600">
                Search
              </button>
            </div>
          </div>
        )}

        {currtab === 2 && (
          <div className="pb-6 mt-12">
            <h1 className="text-3xl text-white text-center mt-8">Train Running Status</h1>
            <div className="flex justify-center items-center gap-[50px] mt-8 mb-12">
              <Select
                styles={{ control: base => ({ ...base, backgroundColor: '#374151', color: 'white', borderColor: '#4b5563', width: '250px', fontSize: '1.2rem' }) }}
                placeholder="Train No./Name"
              />
              <button className="bg-orange-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-orange-600">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrainLandingPage
