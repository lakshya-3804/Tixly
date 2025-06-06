import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword , fetchSignInMethodsForEmail} from "firebase/auth";
import {useDispatch } from 'react-redux';
import { login } from '../redux/logSlice.js';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../redux/userDetails.js';
import GoogleLoginUp from '../components/googleLoginUp.jsx';


const SignUp = () => {
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    try {

      if(!trimmedEmail || !password || !phone){
        alert("Please fill all the fields!");
        return;
      }

      const isRegistered = await fetchSignInMethodsForEmail(auth, trimmedEmail);
      if(isRegistered.length>0){
        alert("Email is already registered!");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      alert("Signup Successful!");
      dispatch(setUserDetails(userCredential.user));
      dispatch(login());
      e.target.reset(); // Reset the form fields
      navigate('/');

    } catch (error) {
      alert("Signup Error!");  
      console.log(e);
      console.error("Signup Error:", error.message);
    }
  }

  return (
    <div className="mx-auto mt-[60px] w-[80%] sm:w-full max-w-sm p-6 border rounded-lg shadow md:p-8 bg-gray-900 border-gray-700">
        <form onSubmit={handleSignup} className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h5>
          <div>
          <PhoneInput
        placeholder="Enter phone number"
        country={'in'}
        value={phone}
        onChange={setPhone}
        inputStyle={{
          width: '100%',
          height: '2.7rem',
          backgroundColor: '#4B5563',
          color: 'white',
          border : '0px',
          fontSize: '1rem',
          borderRadius: '7px',
        }}
        buttonStyle={{
          backgroundColor: '#4B5563' , 
          border: '0px' , 
          borderRadius: '7px 0px 0px 7px',
          borderRight: '1px solid #9CA3AF'
        }} 
        containerStyle={{border: '0px'}}
      />
          </div>
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" autoComplete="on" onChange={(e)=>setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          
          <div className="flex flex-col justify-between items-center gap-[10px]x">
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            <GoogleLoginUp />
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
          </div>        
        </form>
      </div>
  )
}

export default SignUp
