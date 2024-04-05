
import React from 'react'
import { HOMEPAGE_IMG1, HOMEPAGE_IMG2, HOMEPAGE_IMG3, HOMEPAGE_IMG4 } from '../../utils/constant'

const Details = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between mb-4 mt-10 md:mt-20'>
      <div className='w-full md:w-4/12 pt-4 pl-4 pb-4 pr-4 md:ml-20'>
        <div className='flex flex-col p-2 border border-gray-400 shadow-md shadow-gray-700 rounded-md'>
            <p className='font-medium text-lg mb-2'>About ECI</p>
            <p className='font-semibold'>The Election Commission of India is an autonomous constitutional authority responsible for administering Union and State election processes in India. The body administers elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies in India, and the offices of the President and Vice President in the country.</p>
        </div>
      </div>
      <div className='w-full flex flex-col  md:w-6/12 '>
        <div className='m-4  border border-gray-500 rounded-lg shadow-md shadow-slate-700'>
            <div className='flex items-center gap-2 ml-4 mr-4 mb-4 p-2'>
                <img src={HOMEPAGE_IMG1} 
                alt="Image" 
                className='w-6/12 border-2 border-gray-400 h-[200px] rounded-lg shadow-md  hover:shadow-gray-600'/>
                <img src={HOMEPAGE_IMG2}
                alt="Image" 
                className='w-6/12 border-2 border-gray-400 h-[200px] rounded-lg shadow-md  hover:shadow-gray-600'
                />
            </div>
            <div className='flex items-center justify-center gap-2 ml-4 mr-4 p-2'>
                <img src={HOMEPAGE_IMG3}
                alt="Image" 
                className='w-6/12 border-2 border-gray-400 h-[200px] rounded-lg shadow-md  hover:shadow-gray-600' 
                />
                <img src={HOMEPAGE_IMG4}
                alt="Image" 
                className='w-6/12 border-2 border-gray-400 h-[200px] rounded-lg shadow-md  hover:shadow-gray-600'/>
            </div>
      </div>
      </div>
    </div>
  )
}

export default Details
