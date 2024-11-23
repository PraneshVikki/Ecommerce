import React from 'react'
import Logo from './Images/Logo.png'
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
function Login({loginFormData, LoginHandleChange, LoginHandleSubmit}) {
    const onChange = ()=>{
        console.log("It wrks")
    }
return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-900 from-5% to-black">
        <form className="bg-slate-600  w-200 p-12 rounded-lg shadow-md">
            <div className='w-100 flex justify-center items-center'><img src={Logo} className='w-15 h-20 ' alt="" /></div>
            <h5 className='text-center text-white'>Welcome to Loyal Traders</h5>
            <h2 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-violet-400">Login</h2>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                <input type="email" id="email" name="email" value={loginFormData.email} onChange={LoginHandleChange} required className="mt-1 p-2  rounded w-full outline-none " />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                <input type="password" id="password" name="password" value={loginFormData.password} required onChange={LoginHandleChange} className="mt-1 p-2  rounded w-full outline-none " />
                
            </div>

            <ReCAPTCHA
                sitekey="6LdHSy4qAAAAAB2iRCpyKrVa7BdlzdSI_tsGH6Oh"
                onChange={onChange}
            />


            <button type="submit" 
            className="w-full p-px bg-gradient-to-r from-sky-500 to-violet-500 border-2 rounded-lg text-white py-2 px-4 rounded hover:border-2 
            transition-colors duration-200 ease-in-out
            hover:bg-gradient-to-r hover:from-violet-500 hover:to-sky-500 active:scale-90" onClick={LoginHandleSubmit}>
            Login
            </button>
    <div className='mt-3'>
        <div className='flex justify-between'>
        <Link className='text-blue-600' to={'/signup'}>Want to Signup..</Link>
        <Link  className='text-blue-600'>Forget Password</Link>
        </div>
                
                </div>
        </form>
        
    </div>
);
};

export default Login