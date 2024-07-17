import React from 'react'

type Props = {}

export default function superficieTotale({}: Props) {
  return (
    <div className='flex flex-col border border-white rounded-3xl p-2 bg-gray-900 text-white'>
        <div className='text-3xl flex justify-center my-2 text-green-500'>superficie Totale</div>
        <div className='flex flex-row mt-2'>
            <div className='flex flex-col mr-2 items-center'>
                <div className='w-5 mr-3 h-16 bg-yellow-700'></div>
                <div className='text-sm'>culture1</div>
            </div>
            <div className='flex flex-col mr-2'>
                <div className='w-5 mr-3 h-16 bg-yellow-950'></div>
                <div className='text-sm'>culture1</div>
            </div>
            <div className='flex flex-col mr-2'>
                <div className='w-5 mr-3 h-16 bg-yellow-900'></div>
                <div className='text-sm'>culture1</div>
            </div>
            <div className='flex flex-col mr-2'>
                <div className='w-5 mr-3 h-16 bg-yellow-600'></div>
                <div className='text-sm'>culture1</div>
            </div>
            <div className='flex flex-col mr-2'>
                <div className='w-5 mr-3 h-16 bg-yellow-400'></div>
                <div className='text-sm'>culture1</div>
            </div>
        </div>
    </div>
  )
}