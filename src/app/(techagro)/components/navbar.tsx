import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBell, faCog } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export default function navbar({}: Props) {
  return (
    <div className='flex flex-row w-full h-10 md:h-15 text-white bg-gray-900 mx-2 items-end '>
              <div className='flex flex-row w-4/12  items-center flex-shrink-1'>
                <div className='mr-1'>LOG</div>
                <div className='text-green-500'>TECH-AGRO</div>
              </div>
              <div className="w-4/12"></div>
              <div className='flex w-4/12 flex-row'>
                <div className='w-full flex flex-row  justify-end items-end flex-shrink-1'>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faCog} size="6x" width={22}/></div>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faBell} size="6x" width={22}/></div>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faCircleUser} size="6x" width={22}/></div>
                </div>
              </div>
            </div>
  )
}