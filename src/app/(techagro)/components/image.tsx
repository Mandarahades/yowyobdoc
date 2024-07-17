import React from 'react'
import Image from 'next/image'

type Props = {}

export default function image({}: Props) {
  return (
    // <div className="bg-base-100 w-full mb-3 shadow-xl ">
      <div className='w-full shrink-1 md:sticky md:top-0 md:bottom-0 overflow-y-hidden'>
        <img
          src="/fertisat.jpg" alt="Shoes" className='w-full md:h-screen'/>
      </div>
  // </div>
  )
}