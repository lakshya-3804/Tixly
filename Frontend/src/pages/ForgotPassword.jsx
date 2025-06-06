import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      navigate('/login'); // Redirect to login page after sending reset email
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="mx-auto mt-20 mb-20 max-w-sm p-6 border rounded-lg shadow bg-gray-900 border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleResetPassword} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send Reset Email
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
