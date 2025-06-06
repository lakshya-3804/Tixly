import React from 'react'

const About = () => {
  return (
    <div className="bg-blue-50 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center">
          About Tixly
        </h1>

        {/* Introduction */}
        <section className="mb-10 space-y-4">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Tixly</span>, your smart and seamless solution for managing ticket bookings for buses, flights, trains, and movies— all in one place.
          </p>
          <p className="text-lg leading-relaxed">
            At Tixly, we aim to simplify both travel and entertainment experiences by offering a fast, secure, and intuitive platform for booking your preferred mode of transportation or your favorite movie show. Whether you’re planning a business trip, a weekend getaway, or a night at the movies, Tixly is designed to serve all your ticketing needs.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🚀 What We Offer</h2>
          <ul className="space-y-3 pl-5 list-disc">
            <li>
              <span className="font-medium">Easy Booking Experience:</span> Quickly search, select, and book bus, train, flight, or movie tickets in just a few clicks.
            </li>
            <li>
              <span className="font-medium">Real-Time Availability:</span> Get up-to-date information on routes, schedules, showtimes, and seat availability.
            </li>
            <li>
              <span className="font-medium">Digital Ticket Management:</span> Store, view, and manage all your bookings—whether it’s a flight to another city or a movie screening— in one convenient place.
            </li>
            <li>
              <span className="font-medium">Secure Payments:</span> Enjoy fast and reliable payment options with complete data security.
            </li>
            <li>
              <span className="font-medium">24/7 Customer Support:</span> Need help planning travel or fixing a booking? Our support team is always ready to assist.
            </li>
          </ul>
        </section>

        {/* Our Vision */}
        <section className="mb-10 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">🌟 Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To redefine the travel and entertainment ticketing experience through innovation, accessibility, and user-centric design. We believe that booking a bus, train, flight, or movie ticket should be as enjoyable as the experience itself — and we’re committed to making that a reality.
          </p>
        </section>

        {/* Why Choose Tixly */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🧠 Why Choose Tixly?</h2>
          <ul className="space-y-3 pl-5 list-disc">
            <li>User-friendly Interface</li>
            <li>Transparent Pricing</li>
            <li>Quick Cancellations & Refunds</li>
            <li>Wide Range of Options (Buses, Flights, Trains, Movies)</li>
            <li>Trusted by 1000+ users (and growing!)</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4">
          <p className="text-lg leading-relaxed">
            Tixly isn't just a ticket booking platform — it's your all-in-one ticketing companion.
          </p>
          <a
            href="/signup"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Join Tixly Today
          </a>
        </section>
      </div>
    </div>
  )
}

export default About
