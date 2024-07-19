import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import InfoHome from './infoHome';
import Paginate from './paginate';
import SatIndices from './satIndices';

type Props = {};

export default function Image({}: Props) {
  return (
    <div className="relative">
      <img src="/fertisat.jpg" alt="Shoes" className="w-full md:h-screen overflow-scroll" />
      <div className='absolute w-full lg:block bg-gray-900 outline-none text-white border rounded-3xl top-0 left-0 m-2 md:px-5'>
        <InfoHome />
      </div>
      <div className='absolute flex flex-row justify-center items-center text-center w-full bottom-2'>
        <div className='absolute flex flex-row justify-center text-white items-center text-center bottom-16 right-1 bg-gray-900'>
          <SatIndices />
        </div>
        <div className='absolute flex flex-row justify-center items-center text-center w-11/12 mx-3 self-center lg:block bg-gray-900 outline-none text-white border rounded-3xl bottom-0 left-0 m-2 md:px-5'>
          <Paginate />
        </div>
        <div className=' absolute bottom-2 right-1 h-10 w-10 flex mx-1 bg-gray-900 self-end rounded-3xl  text-white justify-center items-center'>
          <FontAwesomeIcon icon={faCalendarDays} size="lg" width={24}/>
        </div>
      </div>
      
    </div>
  );
}