import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBell, faCog, faBars ,faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import Image from 'next/image'
import logo from '../../../../public/images-home/lokropserve.jpg';


type Props = {}

export default function navbar({}: Props) {
  return (
            <div className='flex sticky top-1 flex-row w-full h-10 md:h-16  mx-2 items-center z-50'>
              <div className='navbar-start items-center h-full md:w-3/12'>
                <div className='flex flex-row mr-1 w-2/3 h-full  items-end'>
                   <Image
                    src={logo}
                    alt="logo"
                    className='h-full mr-1'
                  />
                </div>
              </div>
              <div className="navbar-center md:w-5/12">
                <div className="flex ">
                  <input
                    type="text"
                    placeholder="Rechercher une localisation"
                    className="flex-row px-2 py-1 text-black  w-full rounded-3xl hidden md:block"
                  />
                  <div className="pl-2">
                    <FontAwesomeIcon icon={faSearch} height="lg" width={24} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <div className='flex flex-row navbar-end md:w-4/12 justify-end items-end right-1'>
                <div className='w-full flex flex-row  justify-end items-end flex-shrink-1 '>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faCircleUser} size="6x" width={22}/></div>
                  <div className='mx-2 md:mx-5'><FontAwesomeIcon icon={faBell} size="6x" width={22}/></div>
                  <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className='mx-2 md:mx-5 flex'>
                    <div className='mx-2 md:mx-5'>
                    <FontAwesomeIcon icon = {faBars} size="lg" width={22} className='flex self-end'/>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-green-500 rounded-box mt-3 w-52 p-2 shadow text-black">
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
                </div>
              </div>
            </div>
  )
}