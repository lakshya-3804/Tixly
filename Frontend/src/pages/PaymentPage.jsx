import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bookingType, bookingDetails } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!amount) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Invalid payment request.</div>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock payment API call
      const response = await axios.post('http://localhost:3001/api/payment/process', {
        amount,
        bookingType,
        bookingDetails,
        cardDetails
      });

      if (response.data.success) {
        alert(`Payment of ₹${amount} Successful! Your ${bookingType} ticket is confirmed.`);
        navigate('/dash'); // Redirect to user dashboard after success
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('An error occurred during payment processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white mb-6 text-center font-bold">Secure Payment</h2>
        
        <div className="bg-gray-700 p-4 rounded mb-6 text-center">
          <p className="text-gray-400 text-sm">Total Amount to Pay</p>
          <p className="text-3xl text-orange-400 font-bold">₹{amount}</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Cardholder Name</label>
            <input 
              type="text" 
              required
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
              placeholder="John Doe" 
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:border-orange-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Card Number</label>
            <input 
              type="text" 
              required
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
              placeholder="XXXX XXXX XXXX XXXX" 
              maxLength="16"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:border-orange-500 outline-none" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Expiry (MM/YY)</label>
              <input 
                type="text" 
                required
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                placeholder="MM/YY" 
                maxLength="5"
                className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:border-orange-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1 text-sm">CVV</label>
              <input 
                type="password" 
                required
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                placeholder="•••" 
                maxLength="4"
                className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:border-orange-500 outline-none" 
              />
            </div>
          </div>
          
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded bg-orange-500 text-white font-bold hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₹${amount}`}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="w-full py-3 rounded bg-gray-600 text-white font-bold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
