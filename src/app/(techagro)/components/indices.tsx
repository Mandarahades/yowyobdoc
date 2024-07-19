import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faCloud , faVirus, faBook, faBars  } from '@fortawesome/free-solid-svg-icons';


type Props = {}

export default function indices({}: Props) {
  return (
    
        <div className='flex flex-row md:flex-col md:mb-5 md:px-2 md:sticky md:top-0 md:bottom-5  md:mt-0 md:pt-0 md:pb-5 overflow-y-auto  h-10 md:w-20 md:h-screen md:mx-2 md:items-start md:justify-start text-white shrink-1'>
              <div className='flex flex-col w-1/12 md:w-full md:h-48 opacity-80 items-center justify-start mr-5 md:mr-1 pt-3'>
                {/* <div className='flex flex-col items-center md:h-20 md:w-10 justify-center '> */}
                  <FontAwesomeIcon icon={faHome} size="lg" width={24} className='mr-2 md:mr-0 '/>
                  <span className='hidden md:block '>Home</span>
                {/* </div> */}
              </div>
              <div className='flex flex-row md:flex-col w-5/12 md:w-full h-15 md:h-72 bg-gray-900 opacity-80 items-center justify-center p-2 rounded-full mr-5 md:mr-1  md:mb-10 flex-shrink-1'>
                <div className='flex flex-col items-center  md:mb-2'>
                  <div className='rounded-full p-1 md:p-1 w-8 h-8 md:w-8 md:h-8 text-center border border-white md:mb-2'>N</div>
                  <div className='hidden md:block' >Azote</div>
                </div>
                <div className='flex flex-col items-center  md:mb-2 mx-8'>
                  <div className='rounded-full w-8 h-8 p-1 md:p-1 md:w-8 md:h-8 text-center border border-white md:mb-2'>PK</div>
                  <div className='hidden md:block' >Potatium</div>
                </div> 
                <div className='flex flex-col items-center  md:mb-2'>
                  <div className='mx-2 md:mb-1 '><FontAwesomeIcon icon={faCloud} size="6x" width={22}/></div>
                  <div className='hidden md:block'>Météo</div>
                </div>
    
              </div>
            
              <div className='flex flex-row md:flex-col w-5/12 md:w-full h-15 md:h-72  bg-gray-900 opacity-80 items-center justify-center self-end p-2 rounded-full mr-1'>
                  <div className='flex flex-col items-center md:mb-2'>
                    <FontAwesomeIcon icon={faFile} size="xs" width={22}/>
                    <div className='hidden md:block text-center'>Fiche technique</div>
                  </div>
                
                  <div className='flex flex-col items-center  md:mb-2 mx-8'>
                    <FontAwesomeIcon icon={faBook} size="xs" width={22}/>
                    <div className='hidden md:block text-center'>Journal activités</div>
                  </div>
                  <div className='flex flex-col items-center md:py-2  md:mb-2'>
                    <FontAwesomeIcon icon={faVirus} size="xs" width={22}/>
                    <div className="hidden md:block text-center">Maladies</div>
                  </div>
              </div>
      
        </div>
  )
}