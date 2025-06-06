import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../firebase.js";
import { signInWithEmailAndPassword , fetchSignInMethodsForEmail} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../redux/logSlice.js';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../redux/userDetails.js';
import GoogleLoginUp from '../components/googleLoginUp.jsx';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin= async (e)=>{
    e.preventDefault();
    const trimmedEmail = email.trim();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      alert("Login Successful!");
      dispatch(login());
      dispatch(setUserDetails(userCredential.user));
      navigate('/');

    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Email not registered! Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password! Please try again.");
      } else {
        alert("Login Error! Please try again.");
      }
      console.error("Login Error:", error.message);
      e.target.form.reset();
    }
  }
  

  return (
    <div className="mx-auto mt-[60px] w-[80%] sm:w-full max-w-sm p-6 border rounded-lg shadow md:p-8 dark:bg-gray-900 dark:border-gray-700">
        <form className="space-y-6" action="#" type='submit' onSubmit={handleLogin}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" autoComplete="on" onChange={(e)=>setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="xyz@gmail.com" required />
          </div>
          <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div className="flex items-start">
              <Link to="/forgot-password" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot  Password?</Link>
          </div>
          <div className="flex flex-col justify-between items-center gap-[10px]">
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            <GoogleLoginUp />
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
          </div>        
        </form>
      </div>
  )
}

export default Login
