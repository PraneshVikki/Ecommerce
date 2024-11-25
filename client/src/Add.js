import React, { useEffect } from 'react';
import { CiSquareAlert } from "react-icons/ci";
import Nav from './Nav';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';



const Add = ({ AddedDetails, handlePrice,handleChanges }) => {
  const total = AddedDetails.reduce((acc, detail) => {
    if (detail.add) {
      return acc + detail.cusPrice; 
    }
    return acc;
  }, 0);
  
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/checkStatus').then((result)=>{
      console.log(result.data)
      result.data.Registeration === true?navigate('/add'):navigate('/login')
      console.log("executed")
    })
  }, [])
  

  
  return (
    <>
    <Nav />
    <div className='flex flex-col sm:flex-row px-0 sm:px-5 md:px-8 lg:px-10 gap-2 sm:gap-4 md:gap-5 lg:gap-5 items-center sm:items-stretch md:items-stretch  lg:items-stretch'>
      <div className='w-9/12 flex flex-col'>
      {AddedDetails.map((detail) => (
        detail.add && (
          <div className='pt-5 pb-5 flex' key={detail._id}>
            <div className='p-5 w-full bg-slate-600  rounded-lg shadow-md flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row'>
              <img className='object-cover h-48 w-full sm:w-full md:1/2 lg:w-2/6 border rounded-lg' src={`http://127.0.0.1:3001/`+detail.image} alt="" />
              <div className='p-5'>
                <p className='mt-2 text-white text-sm sm:text-md md:text-lg'>{detail.product}</p>
                <p className='text-white text-sm sm:text-md md:text-lg'>Minimum Order in Kg 100</p>
                <div className='flex'>
                  <span className='text-white text-sm sm:text-md md:text-lg'>amount :</span>
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    pattern="[0-9]*" 
                    value={detail.cusAmount} 
                    onChange={(e) => handlePrice(e,detail)} 
                    className={`appearance-none ${
                      detail.priceLimit ? 'bg-red-400' : 'bg-gray-500'
                    }  focus:outline-none focus:border-indigo-500 text-white w-16 rounded flex items-center ml-2`}
                  />
                </div>
                <div>
                  {detail.priceLimit && <span className='text-red-400 flex'><CiSquareAlert className='mt-1'/>Minimum value allowed is {detail.amount}</span>}
                  </div>
                  <div className='mt-1'>
                <span className='text-white text-sm sm:text-md md:text-lg'>price :</span>
                <span class='inline-block text-white bg-gray-500 p-1 ml-1 rounded w-16'>{detail.cusPrice}</span>
                </div>
              </div>
            </div>
          </div>
          
        )
      ))}
      
      </div>
      <div className='w-4/5 sm:w-4/12 md:w-3/12 lg:w-3/12 '>
      <div className='flex pl-0 lg:pl-5 pt-5'>
        <div className='bg-slate-600 w-full rounded-lg p-5'>
          <p className='text-white '>Product list</p>
        {
          AddedDetails.map((detail) => (
            detail.add && (
              <div className='flex justify-between space-x-4 mt-4' key={detail.id}>
                <p className='text-white'>{detail.product}</p>
                <p className='text-white'>&#8377; {detail.cusPrice}</p>
              </div>
            )
          ))
        }
        <div className='flex justify-end'>
          <button onClick={() => handleChanges(total)} className='text-white bg-sky-500 rounded-xl p-1 mt-2'>Procedure to Buy &#8377; {total}</button>
        </div>
        <div>
          
        </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}


export default Add;