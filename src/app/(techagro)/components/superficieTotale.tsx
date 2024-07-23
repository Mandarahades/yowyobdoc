import React from 'react'

type Props = {}

export default function superficieTotale({}: Props) {
  return (
    <div className='flex flex-col justify-center items-center border border-green-500 rounded-3xl p-2 bg-gray-100 '>
        <div className='text-3xl flex flex-grow justify-center items-center my-2'>superficie Totale</div>
        <div className='flex flex-row mt-2'>

            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-5  h-16 bg-yellow-950'></div>
                <div className='text-sm'>Pomme</div>
            </div>
            
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-5  h-16 bg-yellow-900'></div>
                <div className='text-sm'>Manioc</div>
            </div>
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-5  h-16 bg-yellow-600'></div>
                <div className='text-sm'>Soja</div>
            </div>
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-5  h-16 bg-yellow-400'></div>
                <div className='text-sm'>Plantain</div>
            </div>
        </div>
    </div>
  )
}