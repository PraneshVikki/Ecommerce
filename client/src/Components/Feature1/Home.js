import React from 'react';
import Nav from './Nav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home({ details, handleAdd,handleAddedDetails,registeration,handleLogout,status}) {
  return (
    <div className='w-full'>
      <div className=''>
        <Nav className='z-10' handleAddedDetails={handleAddedDetails} registeration={registeration} handleLogout={handleLogout}status={status}/>
      </div>
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-gradient-to-r from-sky-900 from-5% to-black px-1 lg:px-5 md:px-5 sm:px-0'>
        {details?.data.map((detail) => (
          <div className='p-5 bg-slate-600  w-200 rounded-lg shadow-md' key={detail.id}>
            <img className='object-cover h-48 w-96 border   rounded-xl ' src={`http://127.0.0.1:3001/`+detail.image} alt="" />
            <p className=' mt-2 text-white text-sm sm:text-md md:text-lg'>{detail.product}</p> 
            <p className='text-white text-sm sm:text-md md:text-lg'>Minimum amount in kg {detail.amount}</p>
            <div className='flex justify-between'>
            <p className='text-white text-md sm:text-lg md:text-xl'>&#8377;{detail.price}</p>
            <button type='submit' onClick={() => handleAdd(detail.id)} className='bg-sky-600 rounded p-1 text-white'>Add to Cart</button>
            </div>
            <ToastContainer autoClose={2000} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;