import React, { useEffect, useState } from 'react'
import Candidatelist from './Candidatelist'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Vote = () => {

  const navigate = useNavigate()
  const candidate = useSelector((store)=> store?.candidate?.candDetails)
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
      if (!token) {
        navigate('/login'); 
      }
    }, []);

  return (
    <div className='flex flex-col pt-10 ml-5 mr-5 mt-5 md:ml-10 md:mr-10 md:mt-10'>
      {candidate.map((cand)=>(
        <Candidatelist key={cand.id}  id={cand.id} name={cand.name}/>
      ))}
      
    </div>
  )
}

export default Vote
