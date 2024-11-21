import React from 'react'
import cancelImage from './Success/cancelImage.png'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
    <div className='flex justify-center items-center h-screen relative bottom-10'>
        <div className='w-1/5 grid gap-4'>
          <div className='flex relative justify-center top-10'>
            <img src={cancelImage} alt="" className='w-14 h-14'/>
          </div>
          <div className='bg-white p-10 rounded'>
            <div>
                  <h1 className='text-black text-3xl pb-4'>OOps!!</h1>
              </div>
              <div>
                <p className='text-black text-xl pb-2'>Your payment has been Canceled.</p> 
              </div>
              <div>
                <Link to={"/"} className='text-white bg-red-600 text-xl p-1 rounded w-full'>Back to website</Link>
              </div>
          </div>

        </div>
    </div>
  )
}

export default Cancel