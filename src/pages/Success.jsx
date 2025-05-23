import React from 'react'
import { MdDoneOutline } from 'react-icons/md'

const Success = () => {
  return (
    <div className='flex items-center justify-center font-bold gap-2 text-2xl'>
      <MdDoneOutline className='text-green-600'/>
       Order placed successfully
      </div>
  )
}

export default Success