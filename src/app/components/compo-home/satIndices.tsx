import React from 'react'

type Props = {}

export default function satIndices({}: Props) {
  return (
    <div className='flex flex-row text-black'>
        <select className="select select-bordered w-full max-w-xs">
            <option selected>Satellite</option>
            <option>Satellite</option>
            <option>bbb</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
            <option selected>Indices</option>
            <option>Indices</option>
            <option>Indice2</option>
        </select>
    </div>
  )
}