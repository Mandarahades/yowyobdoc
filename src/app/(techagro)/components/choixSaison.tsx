import React from 'react'

type Props = {}

export default function choixSaison({}: Props) {
  return (
    <div className="flex flex-row justify-center mb-2 border border-green-500 rounded-2xl p-2 z-0">
      <form className=''>
        <label className='mr-5'>Saison  :</label>
        <select className=" rounded-md py-2 px-4 bg-gray-100 z-0">
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
        </select>
      </form>
    </div>
  )
}