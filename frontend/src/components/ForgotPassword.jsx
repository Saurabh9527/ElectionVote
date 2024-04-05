
import React, { useState } from 'react'
import { API_END_URL } from '../utils/constant'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";


const ForgotPassword = () => {
    const [aadharCardNumber , setAdharNo] = useState("")
    const [currentPassword , setCurrentPassword] = useState("")
    const [newPassword , setNewPassword] = useState("")
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/login")
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.put(`${API_END_URL}/profile/password`, { aadharCardNumber, currentPassword  , newPassword},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })

            if(res.data.success){
                toast.success(res.data.message)
            }

            setAdharNo("")
            setCurrentPassword("")
            setNewPassword("")
        } catch (error) {
            toast.error(error.response.data.error)
        }

    }
  return (
    <div className='border border-gray-300 rounded-lg ml-5 mr-5 mt-5 md:mr-10 md:ml-10 md:mt-5'>
    <form
      className='p-5 md:p-8 md:ml-8'
      onSubmit={handleSubmit}>
      <div 
      className='flex items-center w-min p-1 mb-2 border border-gray-400 shadow-lg hover:shadow-slate-400 rounded-lg cursor-pointer'
      onClick={handleClick}>
      <IoIosArrowRoundBack className=' text-2xl text-blue-700'/>
        <span className='md:text-lg'>
          <span className='font-bold text-base text-blue-700  px-1'> Login
          </span>
        </span>
      </div>

      <div className='p-1 mb-1'>
        <input
          className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
          type="text"
          value={aadharCardNumber}
          placeholder='Enter Aadhar Number'
          required
          onChange={(e) => setAdharNo(e.target.value)} />
      </div>



      <div className='p-1 mb-5'>
        <input
          className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
          type="password"
          value={currentPassword}
          placeholder='Enter Password'
          required
          onChange={(e) => setCurrentPassword(e.target.value)} />
      </div>

      <div className='p-1 mb-5'>
        <input
          className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
          type="password"
          value={newPassword}
          placeholder='Enter New Password'
          required
          onChange={(e) => setNewPassword(e.target.value)} />
      </div>

          <button
          className="p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md bg-blue-800 hover:bg-blue-900 text-xl text-white"
          type='submit'>Update Password</button>
    </form>
  </div>
  )
}

export default ForgotPassword