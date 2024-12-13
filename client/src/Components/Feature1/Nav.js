import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdAddShoppingCart } from "react-icons/md";
import { PropRegister } from '../../App';
const Nav = ({handleAddedDetails,handleLogout}) => {
  

  const ContextValue = useContext(PropRegister)

  
  return (
<>      <div>
        <div className='flex justify-center items-center h-16 top-0 w-full p-4'>
          <div className="flex items-center justify-center cursor-pointer">
            <Link className="text-white mr-4 hover:border-b-2 border-indigo-500 cursor-pointer opacity-100" to={'/'}>Home</Link>
            <Link className="text-white mr-4 hover:border-b-2 border-indigo-500 cursor-pointer" to={'/about'}>About</Link>
            {ContextValue.registeration === 'Signup or Register'? (
            <Link className='text-white mr-4 hover:border-b-2 border-indigo-500 cursor-pointer' to={'/signup'}>
              {ContextValue.registeration}
            </Link>
          ):(handleLogout)}
            {ContextValue.registeration === 'Logout' && (
              <button onClick={handleLogout} className='text-white mr-4 hover:border-b-2 border-indigo-500 cursor-pointer'>{ContextValue.registeration}</button>
          )}
          </div>
          <div  onClick={handleAddedDetails} className='mr-0 p-2  hover:border border-indigo-500 cursor-pointer rounded-full'>
            <button><MdAddShoppingCart className='text-white' /></button>
          </div>
          {ContextValue.status === 'true' &&
          <div>
            <Link className='text-white pl-1' to={"addProduct"}>Admin</Link>
          </div>
          }
        </div>
      </div></>
  )
}

export default Nav
