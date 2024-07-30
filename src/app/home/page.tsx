"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import Navbar from '../components/compo-home/navbar';
import Indices from '../components/compo-home/indices';
import ImageSat from '../components/compo-home/imageSat';
import SuperficieTotale from '../components/compo-home/superficieTotale';
import ListParcelles from '../components/compo-home/listParcelles';
import ChoixSaison from '../components/compo-home/choixSaison';

import { NextResponse, NextRequest } from 'next/server'

import SelectAddFieldOption from '../components/addField-compo/SelectAddFieldOption';





type Props = {};

export default function Page({}: Props, request: NextRequest) {

  const [showModal, setShowModal] = useState(false);

  // const router = useRouter();
  // const { src } = router.query;

  const scrIsContact = () => {
  if(request) {
    const source = request.nextUrl.pathname
    console.log(source)
    setShowModal(true)
  }
  
};
// console.log(showModal);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
       
    };

  
  return (
    <div className='flex flex-col p-2 w-full bg-gray-100 md:bottom-5 overflow-y-auto md:h-screen md:w-screen'>
      
      {/* <div className='flex flex-col md:top-0 md:bottom-0 md:h-screen'> */}
        <Navbar />
        <div className='flex flex-col md:flex-row my-3 overflow-hidden'>
            <div className='flex  flex-col md:flex-row  md:w-8/12 lg:w-9/12 xl:w-9/12 md:left-0 top-0 md:h-full '>
              <Indices />
              <ImageSat showMod = {showModal}/>
            </div> 
            <div className='flex flex-col md:mx-1 md:sticky md:w-4/12 lg:w-3/12 xl:w-3/12 md:right-0 md:bottom-0  md:scroll-my-1 md:top-0 md:h-screen mt-2 p-2'>
              <ChoixSaison />
              <SuperficieTotale />
              {/* <FiltreParcelles /> */}
              <ListParcelles />
            </div>
        </div>
        
      {/* </div> */}
     
      <SelectAddFieldOption />
    </div>
  );
}