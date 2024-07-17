import React from 'react'
import FiltreParcelles from './filtreParcelles'

type Props = {}

export default function listParcelles({}: Props) {
  return (
    <div className='flex flex-col   items-center mt-2 border bg-gray-900 border-white rounded-2xl text-white'>
        <div className='flex flex-col overflow-y-scroll' style={{ height: '64vh' }}> 
            <div className='text-2xl text-center  text-green-500'>Listes des parcelles</div>
            <div className='mb-2'><FiltreParcelles /></div>
            <div className='flex flex-row border items-center border-green-900 m-4 rounded-2xl'>
                <div className='mr-10 ml-2 border border-spacing-8 border-green-950'>forme1</div>
                <div className=''>Parcelle 1</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme2</div>
                <div className=''>Parcelle 2</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme3</div>
                <div className=''>Parcelle 3</div>
            </div>
            <div className='flex  items-center border border-green-900  m-4 rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl'>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className='flex  items-center border border-green-900 m-4  rounded-2xl '>
                <div className='mr-10 ml-2  border border-spacing-8 border-green-950'>forme4</div>
                <div className=''>Parcelle 4</div>
            </div>
            <div className="flex mt-5 h-16 md:fixed md:w-1/12  bottom-2  right-5  justify-end items-end">
                <button className="btn btn-outline  btn-sm btn-active btn-success w-full">Ajouter une Parcelle</button>
            </div>
        </div>
    </div>
  )
}