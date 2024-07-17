import React from 'react';
import Navbar from '../components/navbar';
import Indices from '../components/indices';
import ImageSat from '../components/image';
import SuperficieTotale from '../components/superficieTotale';
import ListParcelles from '../components/listParcelles';
import ChoixSaison from '../components/choixSaison';
import FiltreParcelles from '../components/filtreParcelles';

type Props = {};

export default function Page({}: Props) {
  return (
    <div className= '  flex flex-col w-full p-5 bg-gray-800 md:sticky md:top-0 overflow-y-hidden md:h-screen '>
      {/* <div className='flex flex-col md:sticky md:top-0 md:bottom-0 md:h-screen'> */}
        <Navbar />
        <div className='flex flex-col md:flex-row my-3 md:sticky md:top-0'>   
            <div className='flex flex-col md:flex-row md:sticky md:w-7/12 lg:w-8/12 xl:w-9/12 md:left-0 top-0 md:max-h-screen '>
              <Indices />
              <ImageSat />
              
            </div>  
            <div className='flex flex-col md:mx-2 md:sticky  md:w-5/12 lg:w-4/12 xl:w-3/12  md:right-0 md:bottom-0 md:max-h-32 md:scroll-my-1  md:top-0 md:h-screen mt-2 h- p-2' >
              <ChoixSaison />
              <SuperficieTotale />
              {/* <FiltreParcelles /> */}
              <ListParcelles />
            </div>
        </div>
      {/* </div> */}
    </div>
  );
}