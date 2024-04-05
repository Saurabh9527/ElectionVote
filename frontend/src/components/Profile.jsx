

import React, { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CANDIDATE_END_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addCandidate } from '../features/Candidate/candidateSlice';
import toast from 'react-hot-toast'
import { FLAG_IMG , VOTE_IMG } from '../utils/constant';

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const user = useSelector((store)=> store?.user?.userDetails)
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);



    const fetchData = async () => {
        try {
            const response = await axios.get(`${CANDIDATE_END_URL}`);
            dispatch(addCandidate(response.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleVote = () => {
        const token = localStorage.getItem('token');
        if (token) {
            if(user.isVoted){
                toast.error("You Have Already Voted")
            }else{
                navigate("/vote")
            }
            
        } else {
            navigate("/login")
        }
    }

    const handleHome = () =>{
        navigate('/home')
    }

    return (
        <div className='flex justify-between  w-full h-[100vh] bg-sky-100'>
            <div className='flex flex-col justify-center items-center ml-2 md:flex-row mt-20 md:mt-0 md:ml-32'>
                <div className='flex flex-col justify-center items-center md:mt-5 border border-gray-300 rounded-lg'>
                    <div>
                        <img src={FLAG_IMG}
                            alt="Logo"
                            className='w-36 h-20 p-1 rounded-lg' />
                    </div>
                    <div className='flex flex-col p-2'>
                        <UserInfo />
                    </div>
                </div>

                <div className=' mt-5 md:mt-5 md:ml-5 flex items-center justify-evenly border rounded-xl border-gray-200 bg-cyan-800 hover:bg-cyan-900 cursor-pointer'
                    onClick={handleVote}>
                    <img src={VOTE_IMG}
                        alt=""
                        className='w-32 h-16 p-2 rounded-xl' />
                    <button className='px-6 font-semibold text-white'>Give Vote</button>
                    <FaArrowAltCircleRight className='text-white w-10 h-10 mr-10' />
                </div>
            </div>

            <div className='-ml-14'>
            <button
                    className="bg-pink-700 text-gray-300 rounded-lg font-medium px-4 py-2 m-1 mt-2 md:m-4 hover:bg-pink-800"
                    onClick={handleHome}>
                    Home
                </button>

            </div>
        </div>
    )
}

export default Profile
