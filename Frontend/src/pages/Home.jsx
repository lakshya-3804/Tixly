import React, { useState, useEffect } from 'react';
import flightcarousel from '../assets/Flight-Tickets-Rule.jpg';
import buscarousel from '../assets/Premium-State-RTC-Bus-Services-to-Travel-in-India-scaled.jpg';
import traincarousel from '../assets/hero-rail-asia.jpg';
import moviecarousel from '../assets/pngtree-blank-movie-ticket-with-popcorn-bucket-filmstrip-clapperboard-and-camera-in-picture-image_3709549.jpg';
import { Link } from 'react-router-dom';
import AnnouncementBlock from '../components/AnnouncementBlock';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [flightcarousel, buscarousel, traincarousel, moviecarousel];

  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const bookingLinks = [
    { to: '/bus', emoji: '🚌', label: 'Bus', from: 'from-blue-500', to2: 'to-blue-700', hover: 'hover:from-blue-600 hover:to-blue-800' },
    { to: '/train', emoji: '🚂', label: 'Train', from: 'from-green-500', to2: 'to-green-700', hover: 'hover:from-green-600 hover:to-green-800' },
    { to: '/flight', emoji: '✈️', label: 'Flight', from: 'from-red-500', to2: 'to-red-700', hover: 'hover:from-red-600 hover:to-red-800' },
    { to: '/movie', emoji: '🍿', label: 'Movie', from: 'from-yellow-500', to2: 'to-yellow-600', hover: 'hover:from-yellow-600 hover:to-yellow-700' },
  ];

  return (
    <div className="min-h-full">
      {/* Carousel */}
      <div className="relative md:w-[80%] w-[90%] m-auto mt-10">
        <div className="relative h-56 overflow-hidden rounded-2xl shadow-xl md:h-[400px]">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={slide} className="w-full h-full object-cover" alt={`slide-${index + 1}`} />
            </div>
          ))}
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Dot indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-400 w-6' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Prev */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 left-3 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-sm"
          onClick={handlePrev}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
        </button>

        {/* Next */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-3 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-sm"
          onClick={handleNext}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Booking Cards Section */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-3 text-gray-900 dark:text-white">
          Book Your Next Journey
        </h1>
        <p className="text-base text-center mb-10 text-gray-500 dark:text-gray-400">
          All your travel needs — buses, trains, flights &amp; movies — in one place.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {bookingLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`bg-gradient-to-br ${item.from} ${item.to2} ${item.hover} text-white py-8 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-3 group`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{item.emoji}</span>
              <span className="text-lg font-bold tracking-wide">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Tixly Section */}
      <div className="bg-white dark:bg-gray-800 border-t border-b border-gray-100 dark:border-gray-700 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Why Choose Tixly?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Instant Booking', desc: 'Book tickets in seconds with real-time availability.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'Your data is encrypted and fully secure at all times.' },
              { icon: '🎫', title: 'Best Prices', desc: 'We compare prices across providers to get you the best deal.' },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Latest Announcements</h2>
        <AnnouncementBlock title="New Vande Bharat Trains Added" message="We have updated our schedules to include the new Vande Bharat routes for faster travel." ctaText="View Routes" ctaLink="/train" />
        <AnnouncementBlock title="Holiday Discounts on Flights" message="Get up to 20% off on domestic flights when you book 14 days in advance." ctaText="Book Now" ctaLink="/flight" />
        <AnnouncementBlock title="Volvo AC Buses Now Available" message="Travel in comfort. Our new fleet of Volvo sleeper buses is now live for intercity routes." ctaText="Search Buses" ctaLink="/bus" />
      </div>
    </div>
  );
};

export default Home;
