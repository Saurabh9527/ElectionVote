

import React from 'react'
import { HERO_IMG1, HERO_IMG2, HERO_IMG3 } from '../../utils/constant'

const Flag = () => {
  return (
    <div className='mb-4'>
      <div className='flex items-center justify-evenly ml-5 mr-5 gap-2  md:ml-10 md:mr-10'>
      <div className=' pt-10 md:pt-20 w-6/12'>
        <img src={HERO_IMG1}
         alt="Image" 
         className='w-full h-full rounded-xl shadow-lg md:shadow-xl hover:shadow-slate-800'/>
      </div>
      <div className='pt-10 md:pt-20 w-6/12'>
        <img src={HERO_IMG2}
         alt="Image" 
         className='w-full h-full rounded-xl shadow-lg md:shadow-xl hover:shadow-slate-800'/>
      </div>
      </div>
      <div className='flex justify-center items-center  ml-5 mr-5 md:ml-10 md:mr-10 pt-5 md:pt-10'>
        <img src={HERO_IMG3} 
        alt="Image"
        className='rounded-xl shadow-lg md:shadow-xl hover:shadow-slate-800' />
      </div>
    </div>
  )
}

export default Flag
