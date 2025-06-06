import React from 'react'

const Contact = () => {
  return (
    <div className=" mx-auto px-4 py-12 bg-blue-50">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      {/* Introduction / Description */}
      <p className="text-lg text-center mb-10">
        Have questions, feedback, or need assistance with your ticket bookings?
        Our team is here to help. Reach out via the form below or use any of the
        contact methods listed.
      </p>
      <div className="min-h-screen text-gray-800 py-12 flex flex-wrap md:flex-nowrap gap-y-10 items-start justify-center p-5">
        <div className="container mx-auto px-4">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

              <div className="space-y-4">
                {/* Customer Support */}
                <div>
                  <h3 className="text-xl font-medium">Customer Support</h3>
                  <p className="mt-1 text-gray-600">
                    For booking issues, cancellations, or general inquiries:
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:support@tixly.com"
                      className="text-blue-600 hover:underline"
                    >
                      support@tixly.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href="" className="text-blue-600 hover:underline">
                      1234567890
                    </a>
                  </p>
                </div>

                {/* Sales & Partnerships */}
                <div>
                  <h3 className="text-xl font-medium">Sales & Partnerships</h3>
                  <p className="mt-1 text-gray-600">
                    Interested in becoming a partner or bulk ticketing?
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:sales@tixly.com"
                      className="text-blue-600 hover:underline"
                    >
                      sales@tixly.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href="" className="text-blue-600 hover:underline">
                      1234567890
                    </a>
                  </p>
                </div>

                {/* Corporate Office Address */}
                <div>
                  <h3 className="text-xl font-medium">Corporate Office</h3>
                  <p className="mt-1 text-gray-600">
                    1234 XYZ Street
                    <br />
                    Cityname, State 12345
                    <br />
                    India
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-medium">Follow Us</h3>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Map Placeholder (optional) */}
        <div className="w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Our Location
          </h2>
          <div className="w-full h-[400px] bg-gray-200 border-2 border-black rounded-lg flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.191064750364!2d81.0159573747543!3d26.80204426483899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be30010416e29%3A0x510633ce6dd735ec!2sLucknow%20vikas%20pradhikaran%20Chauraha!5e0!3m2!1sen!2sin!4v1749217225380!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className='rounded-lg'
              style={{border:0}}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
