import React from 'react'
import { Outlet, Link } from "react-router-dom";
const Header = () => {
  return (
    <div className=' w-full h-auto flex justify-between items-center sm:px-7 px-5 py-3 drop-shadow-md shadow-sm z-10 '>
      <h1 className='text-xl'>
        <Link to="/">Major System</Link>
      </h1>
      <ol className='list-none flex gap-3'>
        <li className='hover:underline cursor-pointer'>
          <Link to="/">Home</Link>
        </li>
        <li className='hover:underline cursor-pointer'>
          <Link to="/quiz">Quiz</Link>
        </li>
        <li className='hover:underline cursor-pointer'>
          <Link to="help">Help</Link>
        </li>
      </ol>
      <Outlet />
    </div>
  )
}

export default Header