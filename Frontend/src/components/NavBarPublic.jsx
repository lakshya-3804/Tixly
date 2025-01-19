import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import tixlogo from '../assets/tixlylogo.jpg';

// home about events contact

const NavBarPublic = () => {

  const [menuVis, setMenuVis] = React.useState('hidden');

  return (
    <div>
    <nav className='bg-gray-900 text-white p-4 flex justify-between items-center w-full border-b border-gray-400'>

      {/* Logo and Name */}
      <div className='flex'>
        <img src={tixlogo} alt="Tixly Logo" className="w-[60px] mr-2" />
        <h1 className="text-4xl font-bold font-orbitron">Tixly</h1>
      </div>

      {/* Navigation Links */}
      <div className='hidden md:block'>

        <ul className='flex gap-4 text-lg font-semibold gap-x-10'> 
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>

      </div>

      {/* Login button and main menu button */}
      <div className='flex items-center'>
        <Link to='/login' className='bg-blue-600 px-4 py-2 rounded mx-1 hover:bg-blue-700'>Log-in</Link>
        <button className='bg-gray-700 ml-2 p-2 rounded text-gray-400 block md:hidden hover:bg-gray-800' onClick={()=>setMenuVis((val)=>(val==='hidden')?'':'hidden')}>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

    </nav>

    {/* Mobile Menu */}
    <div>
      <div className={`${menuVis} bg-gray-700 text-white p-2 md:hidden`}>
        <div className='flex flex-col gap-2 bg-gray-800 p-2 rounded'>
          <Link className='hover:bg-gray-600 p-2 rounded' onClick={()=>setMenuVis('hidden')}>
            Home
          </Link>
          <Link className='hover:bg-gray-600 p-2 rounded' onClick={()=>setMenuVis('hidden')}>
            About
          </Link>
          <Link className='hover:bg-gray-600 p-2 rounded' onClick={()=>setMenuVis('hidden')}>
            Events
          </Link>
          <Link className='hover:bg-gray-600 p-2 rounded' onClick={()=>setMenuVis('hidden')}>
            Contact
          </Link>
        </div>
        </div>
    </div>

    </div>
  );
};

export default NavBarPublic;
