import React, { useEffect } from 'react'
import { FaParachuteBox } from "react-icons/fa";
import { format, addDays } from 'date-fns';
import { FaLocationDot } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoShieldSharp } from "react-icons/io5";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Procedure = ({AddedDetails,handleStripe,clientDetails,setClientDetails,clientDetailsChange}) => {
  const currentDate = new Date();
  const futureDate = addDays(currentDate, 5);
  const total = AddedDetails.reduce((acc, detail) => {
    if (detail.add) {
      return acc + detail.cusPrice; 
    }
    return acc;
  }, 0);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/checkStatus').then((result)=>{
      console.log(result.data.Status)
      result.data.Registeration === true?navigate('/procedure'):navigate('/login')
      console.log("executed")
    })
  }, [])


  return (
    <div >
    <div className='lg:flex md:flex sm:flex p-2 lg:p-10 sm:p-5 md:p-8'>
      <div className='p-5'>        
        <div>
          <div className='flex'>
          <RiContactsBook2Fill className='text-white text-3xl' />
          <h1 className='text-white  text-xl'>Contact Info</h1>
          </div>

        <div className='p-5 grid grid-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        <div className='p-5 flex-1'>
        <input onChange={clientDetailsChange} id='name' className='p-5 border rounded-lg' type="text"  placeholder='Name' name='clientName' value={clientDetails.clientName} required/>
        </div>
        <div className='p-5 flex-1'>
        <input onChange={clientDetailsChange} id='phnNo' className='p-5  rounded-lg' type="text"  placeholder='Phone Number' name='clientPhn' value={clientDetails.clientPhn} required/>
        </div>
        </div>
      </div>
      <div className='text-white flex text-xl pl-5'>
        <div >
          <div className='flex pb-2'>
          <FaLocationDot className='text-3xl'/>
          <h1>Delivery Address</h1>
          </div>

          <h3>We will deliver your order to this address</h3>
        </div>
        
        </div>
      <div className=''>
        <br />
        <div className='pl-5 grid grid-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
        <div className='p-5 flex-1'>
        <input onChange={clientDetailsChange} id='Pincode' className='p-5 rounded-lg' type="text" placeholder='Pincode' name='clientPin' value={clientDetails.clientPin} required/>
        </div>
        
        <div className='p-5 flex-1'>
        <input onChange={clientDetailsChange} id='City' className='p-5 rounded-lg' type="text" name='clientCity' placeholder='City' value={clientDetails.clientCity} required/>
      </div>
        <div className='p-5'>
          <input onChange={clientDetailsChange} id='State' className='p-5 rounded-lg' type="text" placeholder='State' name='clientState' value={clientDetails.clientState} required/>
          </div>
          <div className='p-5 flex-1'>
          <input onChange={clientDetailsChange} id='Locality/Area/Street' className='p-5 rounded-lg' type="text" placeholder='Locality/Area/Street' name='clientArea' value={clientDetails.clientArea} required/>  
        </div> 
        <div className='p-5'>
          <input onChange={clientDetailsChange} id='Flat_no/Building_name' className='p-5 rounded-lg' type="text" placeholder='Flat no/Building name' name='clientBuiding' value={clientDetails.clientBuiding} required/>
          </div>
          <div className='p-5 flex-1'>
          <input onChange={clientDetailsChange} id='Landmark' className='p-5 rounded-lg' type="text" placeholder='Landmark' name='clientLandmark' value={clientDetails.clientLandmark} required/>   
          </div>
        </div>
      </div>
      <div>



      </div>
      </div>
      <div className='p-5 lg:pl-40'>
      <div className='flex items-start gap-4'>
          <div>
          <FaParachuteBox  className='text-4xl text-white'/>
          </div>
          <div>
            <p className='text-white text-xl'>Expected Delivery</p>
            <p className='text-white text-xl'>Estimated delivery dates for your order</p>
          
        <div className='h-80 overflow-y-scroll '>
        <table>
        <tbody>
        {AddedDetails.map(detail=>(
          
          detail.add && (
            
                  <div className='flex gap-5 py-5 lg:p-5 md:p-5' key={detail.id}>
                    <img className='w-24 h-14 rounded-sm' src={`http://127.0.0.1:3001/`+detail.image} alt="" />
                    <div>
                    <p className='text-white  text-xl'>{format(futureDate, 'MMMM dd, yyyy')}</p>
                    <p className='text-white  text-xl'>{detail.product}</p>
                    </div>
                  </div>
            
          )
        ))}
        </tbody>
        </table>
        </div>
        <div className=''>
          <div>
            <h1 className='text-2xl text-white pt-10'>
            Order Details
            </h1>
          </div>
          <div>
          {AddedDetails.map(detail=>(
          
          detail.add && (
            <div className='flex' key={detail.id}>
              <div className='w-4/5 p-1 flex justify-around'>
                <p className='text-white  text-xl'>{detail.product}</p>
                <p className='text-white  text-xl'>&#8377;{detail.cusPrice}</p>
              </div>
            </div>
          )
        ))}
          </div>
          <div className='flex justify-end'>
            <button onClick={handleStripe} className='bg-sky-500 p-1 w-full rounded '>Pay &#8377;{total}</button>
          </div>
        </div>
        </div>

        </div>
        
      </div>

    </div>
    <div className='flex justify-around '>
        <div>
          <IoShieldSharp className='text-white text-5xl' />
          <p className='text-white text-xl'>SECURE PAYMENT</p>
        </div>
        <div>
          <MdOutlineAutoAwesome className='text-white text-5xl' />
          <p className='text-white text-xl'>ASSURED QUALITY</p>
        </div>
      </div>
    </div>
  )
}

export default Procedure