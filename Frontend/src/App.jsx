import React, { useEffect, useState } from 'react';
import {Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import NavBarPublic from './components/NavBarPublic.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';
import TrainLandingPage from './pages/TrainLandingPage.jsx';
import FlightLandingPage from './pages/FlightLandingPage.jsx';
import FlightSearchResults from './pages/FlightSearchResults.jsx';
import FlightBookingPage from './pages/FlightBookingPage';
import FlightReviewPage from './pages/FlightReviewPage';
import {Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { clearUserDetails, setUserDetails } from './redux/userDetails.js';
import { login, logout } from './redux/logSlice.js';
import { auth } from './firebase.js';
import BusLandingPage from './pages/BusLandingPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import Exclusives from './pages/Exclusives.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import TrainSearchList from './pages/TrainSearchList.jsx';

const PrivateRoute = ({authChecked}) => { 
  const logged = useSelector((state) => state.logReducer.value);
  if(!authChecked) return null;
  return logged ? <Outlet /> : <Navigate to="/signup" replace/>;
}

const AuthRoute = ({authChecked}) => {
  const logged = useSelector((state) => state.logReducer.value);
  if(!authChecked) return null;
  return !logged ? <Outlet /> : <Navigate to="/" replace/>;
}

const App = () => {

  const dispatch=useDispatch();

  const [authChecked,setAuthChecked]=useState(false);  // to ensure private routes keep loggedIn on reload

  // to preserve state auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is still signed in according to Firebase.
        const {email, displayName, photoURL } = user;
        dispatch(setUserDetails({email, displayName, photoURL }));
        dispatch(login());
      } else {
        // No user is signed in
        dispatch(clearUserDetails());
        dispatch(logout());
      }
      setAuthChecked(true)
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);


  return (
    <BrowserRouter>
      <NavBarPublic />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exclusive" element={<Exclusives />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication Routes added here */}
        <Route element={<AuthRoute authChecked={authChecked} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>

        {/* Private Routes added here */}
        <Route element={<PrivateRoute authChecked={authChecked} />}>
          <Route path='/dash' element={<DashBoard />} />
          <Route path='/train' element={<TrainLandingPage />} />
          <Route path='/bus' element={<BusLandingPage />} />
          <Route path='/flight' element={<FlightLandingPage />} />
          <Route path='/flight-search' element={<FlightSearchResults />} />
          <Route path='/flight-booking' element={<FlightBookingPage />} />
          <Route path='/flight-review' element={<FlightReviewPage />} />
          <Route path='/movie' element={<TrainLandingPage />} />
          <Route path='/train-search' element={<TrainSearchList />} />
        </Route>
        
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
