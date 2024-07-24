import React from 'react'

type Props = {}

export default function superficieTotale({}: Props) {
  return (
    <div className='flex flex-col justify-center items-center border border-green-500 rounded-3xl p-2 bg-gray-100 '>
        <div className='text-3xl flex flex-grow justify-center items-center my-2'>superficie Totale</div>
        <div className='flex flex-row mt-2'>

            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-7 flex flex-col-reverse  h-16 border-2 border-black rounded'>
                   <div className='w-full  h-1/6 bg-yellow-950 border border-black'></div>
                   <div className='w-full my-2 text-xs'>10%</div>
                </div>
                <div className='text-sm'>Pomme</div>
            </div>
            
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-7 flex flex-col-reverse  h-16 border-2 border-black rounded'>
                   <div className='w-full  h-2/6 bg-yellow-950 border border-black'></div>
                   <div className='w-full my-2 text-xs'>40%</div>
                </div>
                <div className='text-sm'>Manioc</div>
            </div>
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-7 flex flex-col-reverse  h-16 border-2 border-black rounded'>
                   <div className='w-full  h-1/6 bg-yellow-950 border border-black'></div>
                   <div className='w-full my-2 text-xs'>10%</div>
                </div>
                <div className='text-sm'>Soja</div>
            </div>
            <div className='flex flex-col mr-2 justify-center items-center'>
                <div className='w-7 flex flex-col-reverse  h-16 border-2 border-black rounded'>
                   <div className='w-full  h-2/6 bg-yellow-950 border border-black'></div>
                   <div className='w-full my-2 text-xs'>40%</div>
                </div>
                <div className='text-sm'>Plantain</div>
            </div>
        </div>
    </div>
  )
}