import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBell, faCog, faBars ,faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export default function navbar({}: Props) {
  return (
            <div className='flex flex-row w-full h-10 md:h-32 py-  text-white bg-gray-900 mx-2 items-center '>
              <div className='navbar-start  items-center flex-shrink-1'>
                <div className='mr-1 text-4xl'>LOG</div>
                <div className='text-green-500 text-2xl'>TECH-AGRO</div>
              </div>
              <div className="navbar-center md:w-6/12">
                <div className="flex  rounded-md">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="flex-row px-2 py-1  w-full rounded-3xl"
                  />
                  <div className="pl-2">
                    <FontAwesomeIcon icon={faSearch} height="lg" width={24} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div className='navbar-end'>
                <div className='w-full flex flex-row  justify-center items-center flex-shrink-1'>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faCog} size="6x" width={22}/></div>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faBell} size="6x" width={22}/></div>
                  <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className='mx-2 md:mx-5'>
                    <div className='mx-2 md:mx-5'>
                    <FontAwesomeIcon icon={faCircleUser} size="lg" width={22}/>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faBars} size="6x" width={22}/></div>
                </div>
              </div>
            </div>
  )
}