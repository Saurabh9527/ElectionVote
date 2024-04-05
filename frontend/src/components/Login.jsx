
import React, { useState } from 'react'
import { API_END_URL, LOGIN_VOTE_IMG } from '../utils/constant'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/User/userSlice'

const Login = () => {
  const [aadharCardNumber, setAdharNo] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [mobile, setMobileNo] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [address, setAddress] = useState("")
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const disaptch = useDispatch();

  const handleClick = () => {
    setIsLogin(!isLogin)
  }

  const handleForgotPassword = () =>{
    navigate("/forgotPassword")
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(`${API_END_URL}/login`, { aadharCardNumber, password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          })
        // console.log(res.data.response);
        if (res.data.message) {
          toast.success("Welcome")
          // console.log("Token",res.data.token);
          const { name, age, email, mobile, address, aadharCardNumber, _id, isVoted } = res.data.response;
          disaptch(addUser({ name, age, email, mobile, address, aadharCardNumber, _id, isVoted }))
          localStorage.setItem('token', res.data.token);
          navigate("/profile")
        }
      } catch (err) {
        toast.error(err.response.data.error)
      }
    } else {
      //&Register
      try {
        const res = await axios.post(`${API_END_URL}/signup`, { name, age, email, mobile, address, aadharCardNumber, password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
        // console.log(res);
        // console.log(res.data.response);
        if (res.data.message) {
          // toast.success("Register Successfully , Please login")
          // setIsLogin(true)
          const { name, age, email, mobile, address, aadharCardNumber, _id, isVoted } = res.data.response;
          disaptch(addUser({ name, age, email, mobile, address, aadharCardNumber, _id, isVoted }))
          // console.log(res.data.token);
          localStorage.setItem('token', res.data.token);
          navigate("/profile")
        }
      } catch (error) {
        console.log(error);
      }
    }

    setAddress("")
    setAdharNo("")
    setAge("")
    setEmail("")
    setMobileNo("")
    setName("")
    setPassword("")
  }

  return (
    <div className='flex flex-col md:flex-row md:h-[100%]'>
      <div className='flex  items-center  bg-blue-900  justify-center md:w-5/12 md:h-[100vh]'>
        <img
          className='p-1 mt-1 mb-2 h-16 w-28 rounded-lg'
          src={LOGIN_VOTE_IMG} 
          alt="" />
        <div className='ml-2 p-1'>
          <h4 className='font-semibold font-sans text-white '>भारत निर्वाचन आयोग</h4>
          <h4 className='font-semibold font-sans text-white text-lg'>Election Commission of India</h4>
        </div>
      </div>
      <div className='md:w-7/12'>
        <div className='border border-gray-300 rounded-lg ml-5 mr-5 mt-5 md:mr-10 md:ml-10 md:mt-5'>
          <form
            className='p-5 md:p-8 md:ml-8'
            onSubmit={handleSubmit}>
            <div className='flex flex-col p-1 mb-2'>
              <span className='text-xl font-medium mb-1'>{isLogin ? "Login" : "Signup"}</span>
              <span className='md:text-lg'>
                {isLogin ? "Do not have an account?" : "Already have an account?"}
                <span className='font-bold text-base text-blue-700 cursor-pointer'
                  onClick={handleClick}>
                  {isLogin ? "Sign-Up" : "Login"}
                </span>
              </span>
            </div>

            {isLogin ? ("") :
              <div className='p-1 mb-1'>
                <input
                  className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                  type="text"
                  value={name}
                  placeholder='Enter name'
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>}

            {isLogin ? ("") :
              <div className='p-1 mb-1'>
                <input
                  className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                  type="text"
                  value={mobile}
                  placeholder='Enter Mobile No'
                  required
                  onChange={(e) => setMobileNo(e.target.value)} />
              </div>}

            {isLogin ? ("") : <div className='p-1 mb-1'>
              <input
                className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                type="email"
                value={email}
                placeholder='Enter Email'
                required
                onChange={(e) => setEmail(e.target.value)} />
            </div>}


            <div className='p-1 mb-1'>
              <input
                className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                type="text"
                value={aadharCardNumber}
                placeholder='Enter Aadhar Number'
                required
                onChange={(e) => setAdharNo(e.target.value)} />
            </div>

            {isLogin ? ("") : <div className='p-1 mb-1'>
              <input
                className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                type="text"
                value={age}
                placeholder='Enter Your age'
                required
                onChange={(e) => setAge(e.target.value)} />
            </div>}

            {isLogin ? ("") : <div className='p-1 mb-1'>
              <input
                className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                type="text"
                value={address}
                placeholder='Enter your address'
                required
                onChange={(e) => setAddress(e.target.value)} />
            </div>}

            <div className='p-1 mb-5'>
              <input
                className='p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md outline-none'
                type="password"
                value={password}
                placeholder='Enter Password'
                required
                onChange={(e) => setPassword(e.target.value)} />
            </div>
                <button
                className="p-2 mx-auto w-full md:w-10/12 border border-gray-700 rounded-md bg-blue-800 hover:bg-blue-900 text-xl text-white"
                type='submit'>{isLogin ? "Login" : "Register"}</button>


              {isLogin 
              && 
              <p className='text-start text-lg font-medium text-blue-800 cursor-pointer'
              onClick={handleForgotPassword}>Forgot Password?</p>}
    
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
