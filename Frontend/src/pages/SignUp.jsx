import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword , fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useDispatch } from 'react-redux';
import { login } from '../redux/logSlice.js';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../redux/userDetails.js';


const SignUp = () => {
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {

      if(!email || !password || !phone){
        throw new Error("fillall");
      }

      const isRegistered = await fetchSignInMethodsForEmail(auth, email);
      if(isRegistered.length>0){
        throw new Error("registered");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      dispatch(setUserDetails(userCredential.user));
      dispatch(login());
      navigate('/');
    } catch (error) {
      if(error.message==="registered"){
        alert("Email already registered!");
      }
      else if(error.message==="fillall"){
        alert("Please fill all the fields!");
      }
      else alert("Signup Error!");  
      e.target.reset();
      console.log(e);
      console.error("Signup Error:", error.message);
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const isRegistered = await fetchSignInMethodsForEmail(auth, email);
      if(isRegistered.length>0){
        throw new Error("registered");
      }
      alert("Google Signup Successful!");
      dispatch(login());
      dispatch(setUserDetails(result.user));
      navigate('/');
    } catch (error) {
      if(error.message==="registered"){
        alert("Email already registered!");
      }
      else alert("Google Signup Error!");
      console.error("Google Signup Error:", error.message);
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
            <button onClick={handleGoogleSignup} type="button" className="mt-3 inline-flex w-full  items-center justify-center rounded-md text-white bg-black/50 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <span className="mr-2 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 120 120">
                  <path d="M107.145,55H100H87.569H60v18h27.569c-1.852,5.677-5.408,10.585-10.063,14.118 C72.642,90.809,66.578,93,60,93c-12.574,0-23.278-8.002-27.299-19.191C31.6,70.745,31,67.443,31,64 c0-3.839,0.746-7.505,2.101-10.858C37.399,42.505,47.823,35,60,35c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,20.969,72.736,16,60,16c-18.422,0-34.419,10.377-42.466,25.605C14,48.291,12,55.912,12,64c0,7.882,1.9,15.32,5.267,21.882 C25.223,101.389,41.372,112,60,112c12.382,0,23.668-4.688,32.182-12.386C101.896,90.831,108,78.128,108,64 C108,60.922,107.699,57.917,107.145,55z" opacity=".35"></path><path fill="#44bf00" d="M17.267,81.882C25.223,97.389,41.372,108,60,108c12.382,0,23.668-4.688,32.182-12.386L77.506,83.118 C72.642,86.809,66.577,89,60,89c-12.574,0-23.278-8.002-27.299-19.191L17.267,81.882z"></path><path d="M77.506,83.118c-0.684,0.553-1.685,1.158-2.398,1.638l14.711,12.846 c0.807-0.641,1.6-1.298,2.363-1.988L77.506,83.118z" opacity=".35"></path><path fill="#0075ff" d="M92.182,95.614C101.896,86.83,108,74.128,108,60c0-3.078-0.301-6.083-0.855-9H100H87.569H60v18 h27.569c-1.852,5.677-5.408,10.585-10.063,14.118L92.182,95.614z"></path><path d="M32.701,69.809L17.267,81.882c0.486,0.948,1.004,1.877,1.551,2.787l15.3-11.576 C33.63,72.181,33.05,70.804,32.701,69.809z" opacity=".35"></path><path fill="#ffc400" d="M17.267,81.882C13.9,75.32,12,67.882,12,60c0-8.088,2-15.709,5.534-22.395l15.568,11.537 C31.746,52.496,31,56.161,31,60c0,3.443,0.6,6.745,1.701,9.809L17.267,81.882z"></path><path d="M17.534,37.605c-0.482,0.844-1.169,2.36-1.564,3.251l16.059,11.491 c0.299-1.095,0.653-2.167,1.072-3.205L17.534,37.605z" opacity=".35"></path><path fill="#ff1200" d="M33.101,49.142C37.399,38.505,47.823,31,60,31c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,16.969,72.736,12,60,12c-18.422,0-34.419,10.377-42.466,25.605L33.101,49.142z"></path>
                </svg>
              </span>
              Register with Google
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
          </div>        
        </form>
      </div>
  )
}

export default SignUp
