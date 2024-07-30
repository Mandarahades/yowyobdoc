import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import satPic from '../../../../public/images-home/fertisat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import InfoHome from './infoHome';
import Paginate from './paginate';
import SatIndices from './satIndices';

type Props = {
  showMod: boolean;
};

export default function ImageSat({showMod}: Props) {


  useEffect(() => {

    if (showMod) {
      openModalDefault()
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
    
    const openModal = () => {
        setShowModal(true);
        show();
    };

    const openModalDefault = () => {
      if(showMod) show();
    };

    

    const closeModal = () => {
         setShowModal(false);
        
    };

    const show = () =>{
      document.getElementById('my_modal_3').showModal()
    }
    
  return (
    <div className=" flex items-center justify-center sticky  top-10  mt-2 h-full w-full overflow-hidden"  >
      
      <div className='h-full'>
        <Image
        src={satPic}
          alt="image satellite"
          className='md:h-screen'
        />
      </div>
      
      <div className='absolute w-full m-1 px-2 self-center lg:block bg-gray-900 opacity-60 outline-none text-white border rounded-3xl top-0  md:px-2'>
        <InfoHome />
      </div>
      <div className='absolute  justify-end  self-end text-center w-full bottom-1 right-1'>
        <button className="btn btn-outline absolute bottom-2  btn-sm btn-active btn-success opacity-80 right-1" onClick={openModal}>Ajouter une Parcelle</button>
      </div>
    </div>
  );
}