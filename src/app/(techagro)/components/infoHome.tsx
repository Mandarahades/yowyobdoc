import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

type Props = {}

export default function infoHome({}: Props) {
  return (
    <div className='flex flex-row justify-between '>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div className='mr-2 text-center'>Localite</div>
                <div className='text-center'>departement</div>
            </div>
            <div className='flex flex-row'>
                <div className='mr-2 text-center'>heure</div>
                <div className='text-center'>date</div>
            </div>
        </div>
        <div className='flex flex-wrap '>   
            <div className='flex flex-col justify-center items-center mx-2'>
                <FontAwesomeIcon icon={faSun} size="xs" width={22}/>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div>Humidity</div>
                {/* <div>Value</div> */}
            </div>
            <div className='flex flex-col justify-center items-center mx-2'>
                <div>Temperature</div>
                {/* <div>Value</div> */}
            </div>
            <div className='flex flex-col justify-center items-center mx-2'>
                <div>Presure</div>
                {/* <div>Value</div> */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div>Wind</div>
                {/* <div>Value</div> */}
            </div>
        </div>    
    </div>
  )
}