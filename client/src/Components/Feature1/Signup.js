import React from 'react';
import '../../index.css';
import Logo from '../../assets/Images/Logo.png';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function Signup({formData, handleChange, handleSubmit,password, passwordError, submit,setSubmit}) {
    const onChange = ()=>{
        console.log("It wrks")
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-900 from-5% to-black">
            <form onSubmit={handleSubmit} className="bg-slate-600  w-200 p-12 rounded-lg shadow-md">
                <div className='w-100 flex justify-center items-center'><img src={Logo} className='w-15 h-20 ' alt="" /></div>
                <h5 className='text-center text-white'>Welcome to Loyal Traders</h5>
                <h2 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-violet-400">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2  rounded w-full outline-none " />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2  rounded w-full outline-none " />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} required onChange={handleChange} className="mt-1 p-2  rounded w-full outline-none " />
                    {!password && submit &&  <p className='text-red-500 text-sm w-40'>{passwordError}</p>}
                </div>
                
                <ReCAPTCHA
                sitekey="6LdHSy4qAAAAAB2iRCpyKrVa7BdlzdSI_tsGH6Oh"
                onChange={onChange}
            />

                <button onClick={setSubmit(true)} type="submit" 
                    className="w-full p-px bg-gradient-to-r from-sky-500 to-violet-500 border-2 rounded-lg text-white py-2 px-4 rounded hover:border-2 
                    transition-colors
                    hover:bg-gradient-to-r hover:from-violet-500 hover:to-sky-500 active:scale-90">
                    Sign Up
                </button>
                <div className='mt-3'>
                <Link className='text-blue-600' to={'/login'}>Alread Signup..</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
