import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tixlogo from '../assets/tixlylogo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/logSlice.js';
import { clearUserDetails } from '../redux/userDetails.js';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useTheme } from '../context/ThemeContext.jsx';

const NavBarPublic = () => {
  const [menuVis, setMenuVis] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.logReducer.value);
  const userDetails = useSelector((state) => state.userDetailsReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfIconDropOpen, setProfIconDropOpen] = React.useState(false);
  const { isDark, setIsDark } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUserDetails());
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <div>
      {/* Navbar — always dark for contrast */}
      <nav className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center w-full border-b border-slate-700 shadow-lg">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={tixlogo} alt="Tixly Logo" className="w-10 h-10 rounded-lg object-cover" />
          <span className="text-2xl font-bold font-orbitron text-orange-400 tracking-wide">Tixly</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-orange-400 transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors duration-200">About</Link>
          <Link to="/exclusive" className="hover:text-orange-400 transition-colors duration-200">Exclusives</Link>
          <Link to="/contact" className="hover:text-orange-400 transition-colors duration-200">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(v => !v)}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm6.364 2.636a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM21 11h1a1 1 0 010 2h-1a1 1 0 010-2zm-2.636 6.364a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM12 18a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm-6.364-1.636a1 1 0 010-1.414l.707-.707A1 1 0 117.757 16.6l-.707.707a1 1 0 01-1.414 0zM4 11H3a1 1 0 000 2h1a1 1 0 000-2zm.636-6.364a1 1 0 011.414 0l.707.707A1 1 0 015.343 6.757l-.707-.707a1 1 0 010-1.414zM12 7a5 5 0 100 10A5 5 0 0012 7z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008.29 2.06a10.14 10.14 0 00-2.52 18.62 10 10 0 005.27 1.5 10.15 10.15 0 0010-8.12 1 1 0 00-.4-.96z"/>
              </svg>
            )}
          </button>

          {/* Profile (logged in) */}
          {isLoggedIn && (
            <div className="relative">
              <button onClick={() => setProfIconDropOpen(v => !v)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                <span className="text-sm font-medium truncate max-w-[120px]">{userDetails?.email?.split('@')[0] || 'Account'}</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isProfIconDropOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">{userDetails?.email}</p>
                  </div>
                  <Link to="/dash" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors" onClick={() => setProfIconDropOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-700 transition-colors">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Auth buttons (logged out) */}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-200 shadow-md shadow-orange-900/30">
                Register
              </Link>
            </>
          )}

          {/* Hamburger (mobile) */}
          <button
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors md:hidden"
            onClick={() => setMenuVis(v => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuVis ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuVis && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 shadow-lg">
          <div className="flex flex-col px-4 py-3 gap-1">
            {[['/', 'Home'], ['/about', 'About'], ['/exclusive', 'Exclusives'], ['/contact', 'Contact']].map(([path, label]) => (
              <Link key={path} to={path} className="px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium" onClick={() => setMenuVis(false)}>{label}</Link>
            ))}
            {!isLoggedIn && <>
              <Link to="/login" className="px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium" onClick={() => setMenuVis(false)}>Login</Link>
              <Link to="/signup" className="px-3 py-2.5 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors text-sm font-medium text-center" onClick={() => setMenuVis(false)}>Register</Link>
            </>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarPublic;
