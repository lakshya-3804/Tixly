import React from "react";

import movimg from "../assets/pngtree-blank-movie-ticket-with-popcorn-bucket-filmstrip-clapperboard-and-camera-in-picture-image_3709549.jpg";
import flightimg from '../assets/Flight-Tickets-Rule.jpg'
import busimg from '../assets/Premium-State-RTC-Bus-Services-to-Travel-in-India-scaled.jpg';

const Exclusives = () => {


  const placeholderDeals = [
    {
      id: 1,
      title: "Early Bird Flight Discount",
      subtitle: "Get 20% off flights booked 30+ days in advance",
      imageUrl: flightimg,
      link: "#",
    },
    {
      id: 2,
      title: "Movie Night Special",
      subtitle: "Buy 1 Get 1 Free on select movies",
      imageUrl: movimg,
      link: "#",
    },
    {
      id: 3,
      title: "Weekend Bus Tours",
      subtitle: "Flat ₹199 tickets for all bus tours this weekend",
      imageUrl: busimg,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">
          🔥 Deals & Exclusive Offers
        </h1>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => window.location.href = deal.link}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{deal.title}</h2>
                <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                  {deal.subtitle}
                </p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = deal.link;
                  }}
                >
                  View Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Exclusives;
