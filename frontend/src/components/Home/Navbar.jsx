
import React, { useEffect, useState } from 'react'
import { IoIosCall } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { NAVBAR_VOTE_IMG } from '../../utils/constant';


const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null)
  const handleClick = () => {
    navigate("/login")
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const handleVote = () => {
    navigate("/profile")
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
}

  return (
    <div className="bg-blue-900 p-4 pb-3 flex justify-between items-center">
      <div className="flex items-center">
        <img src={NAVBAR_VOTE_IMG} alt="Logo"
          className="w-28 h-16 mr-2 md:mr-8 rounded-lg" />
        <div className='flex justify-between items-center gap-1  md:gap-2'>
          <IoIosCall className='text-white md:w-8 md:h-8' />
          <span className="text-white md:text-lg md:font-medium">
            Call - 1950</span>
        </div>

      </div>

      <div className='flex flex-col md:flex-row items-center gap-1'>
        { token && <button
          className="bg-pink-700 text-gray-300 font-medium px-4 py-2 rounded-md  hover:bg-pink-800"
          onClick={handleVote}>
          Profile
        </button>}

        { token &&
          <button
            className="bg-pink-700 text-gray-300 rounded-lg font-medium px-4 py-2  hover:bg-pink-800"
            onClick={handleLogout}>
            Logout
          </button>}

        {!token && <button
          className="bg-pink-700 text-gray-300 font-medium px-4 py-2 rounded-md  hover:bg-pink-800"
          onClick={handleClick}>
          Login
        </button>}

      </div>
    </div>
  )
}

export default Navbar
