import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarPublic from './components/NavBarPublic.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Events from './pages/Events.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';
import TrainLandingPage from './pages/TrainLandingPage.jsx';
import FlightLandingPage from './pages/FlightLandingPage.jsx';

const App = () => {
  return (
    <Router>
      <NavBarPublic />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/train' element={<TrainLandingPage />} />
        <Route path='/flight' element={<FlightLandingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
