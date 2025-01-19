import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarPublic from './components/NavBarPublic.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Events from './pages/Events.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignUp from './pages/SignUp.jsx';

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
      </Routes>
    </Router>
  );
};

export default App;
