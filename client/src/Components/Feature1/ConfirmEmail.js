import React, { useEffect, useRef } from 'react';
import Logo from '../../assets/Images/Logo.png';
import axios from 'axios';

function ConfirmEmail({ otpHandleChange, otpHandleSubmit, storeOtp, formData, setStoreOtp }) {
  const storeOtpRef = useRef(false); 

  useEffect(() => {
    if (!storeOtpRef.current) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      otp = otp.toString();
      console.log(otp)
      setStoreOtp(otp);
      axios.post('http://localhost:3001/signupDB/otp', { otp, formData })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      
      storeOtpRef.current = true; 
    }
  }, [formData, setStoreOtp, storeOtpRef]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-900 from-5% to-black">
      <form onSubmit={otpHandleSubmit} className="bg-slate-600  w-200 p-12 rounded-lg shadow-md">
        <div className='w-100 flex justify-center items-center'><img src={Logo} className='w-15 h-20 ' alt="" /></div>
        <h5 className='text-center text-white mt-1'>Welcome to Loyal Traders</h5>

        <h2 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-violet-400 mt-2">Verification</h2>

        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-white mt-2">Enter your OTP here</label>
          <input type="text" id="otp" name="otp" value={formData.otp} onChange={otpHandleChange} required className="mt-1 p-2  rounded w-full outline-none mt-2" />
        </div>
        <button type="submit"
          className="w-full p-px bg-gradient-to-r from-sky-600 to-violet-600 border-2 rounded-lg text-white py-2 px-4 rounded hover:border-2 
          transition-colors duration-200 ease-in-out
          hover:bg-gradient-to-r hover:from-violet-600 hover:to-sky-600 active:scale-90">
          Confirm
        </button>
      </form>
    </div>
  )
}

export default ConfirmEmail;
