import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GreenTick from '../../assets/Success/Green-Tick-Vector-PNG-Photos.png'

const Success = ({clientDetails}) => {

  return (
    <div>
        <div className='flex justify-center items-center h-screen relative bottom-10'>
        <div className='w-1/5 grid gap-4'>
          <div className='flex relative justify-center top-10'>
            <img src={GreenTick} alt="" className='w-14 h-14'/>
          </div>
          <div className='bg-white p-10 rounded'>
            <div>
                  <h1 className='text-black text-3xl pb-4'>Thank You!!</h1>
              </div>
              <div>
                <p className='text-black text-xl pb-2'>Your payment has been successfully made.Thank You</p> 
              </div>
              <div>
                <Link to={"/"} className='text-white bg-green-600 text-xl p-1 rounded w-full'>Back to website</Link>
              </div>
          </div>

        </div>
    </div>
    </div>
  )
}

export default Success