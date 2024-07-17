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
    <div className='container flex flex-col bg-gray-800 p-3 md:sticky top overflow-y-scroll max-h-screen '>
      <div className='flex flex-col'>
        <Navbar />
        <div className='flex flex-col md:flex-row my-3 md:sticky md:top-0'>   
            <div className='md:sticky md:w-9/12 md:left-0 top-0 md:max-h-screen flex md:flex-row'>
              <Indices />
              <ImageSat />
              
            </div>  
            <div className='flex flex-col md:mx-2 md:sticky md:w-3/12  md:right-0 md:bottom-0 md:max-h-32 md:scroll-my-1  md:top-0 ' >
              <ChoixSaison />
              <SuperficieTotale />
              {/* <FiltreParcelles /> */}
              <ListParcelles />
            </div>
        </div>
      </div>
    </div>
  );
}