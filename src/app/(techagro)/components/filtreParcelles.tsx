import React from 'react'

type Props = {}

export default function filtreParcelles({}: Props) {
  return (
    <div className="flex flex-row justify-center border border-white rounded-2xl mt-2">
      <div className='text-sm text-green-500 flex flex-col items-center justify-center mr-5 ml-2'>Filtrer</div>
      <form className=' form flex flex-row text-white justify-center items-center'>
        <div className='flex flex-row'>
          <div className='flex flex-col mr-2'>
            <label className=''>Localité  :</label>
            <label className=''>Parcelle  :</label>
          </div>
          <div className='mx-1 flex flex-col text-sm'>
              <select  className="form-control rounded-md my-1 px-4 bg-gray-700">
                  <option>Nkekem</option>
                  <option>Njombé</option>
                  <option>Pendja</option>
                  <option>Foumbot</option>
                  <option>Souza</option>
              </select>
              <select className="form-control rounded-md px-4 bg-gray-700">
                  <option>Parcelle 1</option>
                  <option>Parcelle 2</option>
                  <option>Parcelle 3</option>
                  <option>Parcelle 4</option>
                  <option>Parcelle 5</option>
              </select>
          </div>
        </div>
      </form>
    </div>
  )
}