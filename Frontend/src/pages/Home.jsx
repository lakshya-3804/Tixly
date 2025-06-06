import React, { useState, useEffect } from 'react';
import flightcarousel from '../assets/Flight-Tickets-Rule.jpg';
import buscarousel from '../assets/Premium-State-RTC-Bus-Services-to-Travel-in-India-scaled.jpg';
import traincarousel from '../assets/hero-rail-asia.jpg';
import moviecarousel from '../assets/pngtree-blank-movie-ticket-with-popcorn-bucket-filmstrip-clapperboard-and-camera-in-picture-image_3709549.jpg'
import { Link } from 'react-router-dom';
import AnnouncementBlock from '../components/AnnouncementBlock';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    flightcarousel,
    buscarousel,
    traincarousel,
    moviecarousel
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  return (
    <div>
      {/* Carousel Section */}
      <div className="relative md:w-[80%] w-[90%] m-auto mt-10">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden border-[2px] border-black rounded-3xl md:h-[400px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${currentSlide === index ? 'block' : 'hidden'} h-full`}
            >
              <img
                src={slide}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full"
                alt={`carousel-item-${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className="w-3 h-3 rounded-full"
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="border-[3px] bg-white inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-100 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="border-[3px] bg-white inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-100 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Other Home Content */}
      <div className="w-full mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Ticketing Service</h1>
        <p className="text-lg text-center mb-8">
          Book your bus, train, flight, and movie tickets all in one place with ease and convenience.
        </p>
        <div className="flex flex-wrap justify-evenly sm:w-[90%] md:w-[70%] m-auto gap-y-5">
          <Link to='/bus' className="bg-blue-600 text-white p-1 sm:px-6 sm:py-2 rounded-lg sm:w-[120px] sm:text-2xl w-[70px] text-center">Bus </Link>
          <Link to='/train' className="bg-green-600 text-white p-1 sm:px-6 sm:py-2  rounded-lg sm:w-[120px] sm:text-2xl w-[70px] text-center">Train </Link>
          <Link to='/flight' className="bg-red-600 text-white p-1 sm:px-6 sm:py-2  rounded-lg sm:w-[120px] sm:text-2xl w-[70px] text-center">Flight </Link>
          <Link to='/movie' className="bg-yellow-600 text-white p-1 sm:px-6 sm:py-2 rounded-lg sm:w-[120px] sm:text-2xl w-[70px] text-center">Movie </Link>
        </div>
      </div>


      {/* Announcement Blocks */}
      <div className='mt-10 mb-10 w-[90%] m-auto'>
        <h2 className="text-3xl font-bold text-center mb-6">Latest Announcements</h2>
        <AnnouncementBlock />
        <AnnouncementBlock />
        <AnnouncementBlock />
      </div>

    </div>
  );
};

export default Home;
