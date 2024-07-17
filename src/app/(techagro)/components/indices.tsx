import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faCloud , faVirus, faBook, faBars  } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export default function indices({}: Props) {
  return (
    
        <div className='flex flex-row md:flex-col md:px-2 my- md:my-0 md:py-0  h-10 md:w-24 md:max-h-screen md:mx-2 md:items-start md:justify-start text-white shrink-1'>
              <div className='flex flex-row md:flex-col w-1/12 md:w-full   bg-gray-900 opacity-80 items-center justify-center p-2 rounded-full mr-5 md:mr-1'>
                <div className='flex flex-col items-center md:h-16 md:w-10 justify-center '>
                  <FontAwesomeIcon icon={faHome} size="xs" width={22} className='mr-2 md:mr-0 '/>
                  <span className='hidden md:block '>Home</span>
                </div>
              </div>
              <div className='flex flex-row md:flex-col w-5/12 md:w-full h-15 md:h-60 bg-gray-900 opacity-80 items-center justify-center p-2 rounded-full md:mr-1 md:mb-2 md:mt-8 flex-shrink-1'>
                <div className='flex flex-col items-center  md:mb-2'>
                  <div className='rounded-full p-1 md:p-1 w-8 h-8 md:w-8 md:h-8 text-center border border-white md:mb-2'>N</div>
                  <div className='hidden md:block' >Azote</div>
                </div>
                <div className='flex flex-col items-center  md:mb-2 mx-3'>
                  <div className='rounded-full w-8 h-8 p-1 md:p-1 md:w-8 md:h-8 text-center border border-white md:mb-2'>PK</div>
                  <div className='hidden md:block' >Potatium</div>
                </div> 
                <div className='flex flex-col items-center  md:mb-2'>
                  <div className='mx-2 md:mb-1 '><FontAwesomeIcon icon={faCloud} size="6x" width={22}/></div>
                  <div className='hidden md:block'>Météo</div>
                </div>
    
              </div>
            
              <div className='flex flex-row md:flex-col w-5/12 md:w-full h-15 md:h-64  bg-gray-900 opacity-80 items-center justify-center p-2 rounded-full mr-1 md:mb-8 '>
                  <div className='flex flex-col items-center md:mb-2'>
                    <FontAwesomeIcon icon={faFile} size="xs" width={22}/>
                    <div className='hidden md:block'>Météo</div>
                  </div>
                
                  <div className='flex flex-col items-center  md:mb-2 mx-3'>
                    <FontAwesomeIcon icon={faBook} size="xs" width={22}/>
                    <div className='hidden md:block'>Météo</div>
                  </div>
                  <div className='flex flex-col items-center  md:mb-2'>
                    <FontAwesomeIcon icon={faVirus} size="xs" width={22}/>
                    <div className='hidden md:block'>Météo</div>
                  </div>
              </div>
            
              <div className="md:mx-2 p-2 md:px-2 flex flex-col justify-center items-center self-end md:bottom-auto w-1/12 md:w-full bg-gray-900 rounded-full">
                <FontAwesomeIcon icon={faBars} size="xs" width={22} className="mr-2 md:mr-0"/>
                <span className="hidden md:block my-2">Menu</span>
              </div>
        </div>
  )
}