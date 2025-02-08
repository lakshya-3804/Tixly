import React , {useState} from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../components/dropdown.css'

import trainimg from '../assets/icons8-train-50.png'
import calimg from '../assets/icons8-calender-50.png'
import statimg from '../assets/icons8-status-50.png'

const TrainLandingPage = () => {

  const [currtab, setCurrtab] = useState(0);
  const [date, setDate] = useState(new Date());
  const options = [
    'ALL Class', 'Sleeper Class', 'Third AC', 'Second AC', 'First AC', 'General Class', 'AC Chair Car'
  ];

  return (
    <div>
      <div className='bg-gray-900 w-[80%] m-auto rounded-lg mt-12'>

        {/* Tabs */}
        <div className="border-b border-gray-700">
            <ul className="flex flex-wrap justify-evenly -mb-px text-sm font-medium text-center text-gray-400 w-full">
                <li class={`me-2`}>
                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300 group ${currtab === 0 ? 'border-b-2 text-white border-white' : ''}`} onClick={()=>setCurrtab(0)}>
                        <img className='w-4 h-4 mr-1' src={trainimg} /> Book Train Tickets
                    </a>
                </li>
                <li class="me-2">
                    <a href="#" className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300 group ${currtab === 1 ? 'border-b-2 text-white border-white' : ''}`} onClick={()=>setCurrtab(1)}>
                        <img className='w-4 h-4 mr-1' src={calimg} /> Check Train Schedule
                    </a>
                </li>
                <li class="me-2">
                    <a href="#" class={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300 group ${currtab === 2 ? 'border-b-2 text-white border-white' : ''}`} onClick={()=>setCurrtab(2)}>
                        <img className='w-4 h-4 mr-1' src={statimg} /> Check Running Status
                    </a>
                </li>
            </ul>
        </div>

        {/* MAIN */}
        <div className={`pb-6 w-[90%] m-auto mt-12 ${currtab === 0 ? 'block' : 'hidden'}`}>
            <div className='mt-12 mb-12'>
                <h1 className='text-3xl text-white text-center mt-8'>Book Train Tickets</h1>
                <div className='flex flex-wrap justify-center items-center gap-4 mt-8'>

                    <Select styles={{
                        control:(baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: '#374151',
                            color: 'white',
                            borderColor: '#4b5563',
                            width: '250px',
                            fontSize: '1.2rem',
                            borderRadius: '0.375rem',
                        }),
                    }} placeholder='From' />

                    <Select styles={{
                        control:(baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: '#374151',
                            color: 'white',
                            borderColor: '#4b5563',
                            width: '250px',
                            fontSize: '1.2rem',
                            borderRadius: '0.375rem',
                        }),
                    }} placeholder='To' />


                  <div className="flex relative">
                      <svg
                        className="absolute left-3 top-[15px] z-10 w-4 h-4 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                      placeholderText="Select date"
                      dateFormat="dd/MM/yyyy"
                      className="border text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] h-full ps-10 p-[11px] bg-gray-700 border-gray-600 text-white"
                    />
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
                <button className='bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600'>Search</button>
            </div>

        </div>



        {/* Train Schedule */}
        <div className={`pb-6 mt-12 ${currtab === 1 ? 'block' : 'hidden'}`}>
          <h1 className='text-3xl text-white text-center mt-8'>Train Schedule</h1>
          <div className='flex flex-wrap justify-center items-center gap-[50px] mt-8  mb-12 w-[90%] m-auto'>
            <Select styles={{
              control:(baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#374151',
                  color: 'white',
                  borderColor: '#4b5563',
                  width: '250px',
                  fontSize: '1.2rem',
              }),
            }} placeholder='Train No./Name' />

            <div className='flex justify-center items-center'>
              <button className='bg-orange-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-orange-600'>Search</button>
            </div>

          </div>
        </div>



        {/* Running Status */}
        <div className={`pb-6 mt-12 ${currtab === 2 ? 'block' : 'hidden'}`}>
          <h1 className='text-3xl text-white text-center mt-8'>Train Running Status</h1>
          <div className='flex flex-wrap justify-center items-center gap-[50px] mt-8  mb-12 w-[90%] m-auto'>
            <Select styles={{
              control:(baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#374151',
                  color: 'white',
                  borderColor: '#4b5563',
                  width: '250px',
                  fontSize: '1.2rem',
              }),
            }} placeholder='Train No./Name' />

            <div className='flex justify-center items-center'>
              <button className='bg-orange-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-orange-600' >Search</button>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default TrainLandingPage
