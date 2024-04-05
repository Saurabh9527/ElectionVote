

import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

import { candidate1, candidat2, candidate3, candidate4, CANDIDATE_END_URL } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateIsVoted } from '../features/User/userSlice'

const Candidatelist = ({ id, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.post(`${CANDIDATE_END_URL}/vote/${id}`, null, config)
      dispatch(updateIsVoted(true))
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/profile")
      }
    } catch (error) {
      console.log("catch" , error);
    }
  }
  return (
    <div className='flex md:justify-evenly items-center mb-10 bg-sky-100 w-full md:w-6/12 gap-1 mx-auto'>
        <div className='p-2 w-full md:w-auto'>
          <h4 className='p-2 text-xl font-medium'>{name}</h4>
        </div>
        <div className='p-2'>
          <img src="https://images.unsplash.com/photo-1580130379624-3a069adbffc5?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="" 
          className='w-full md:h-44 md:w-44 rounded-full '/>
        </div>
        <div className='p-2 w-full md:w-auto'>
          <button className='bg-pink-800 hover:bg-pink-900 px-6 py-2 rounded text-gray-200 font-medium'
          onClick={handleButtonClick}>Vote</button>
        </div>
    </div>
  )
}

export default Candidatelist
