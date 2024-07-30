"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCloud } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {}

export default function page({}: Props) {
  return (
<div className='flex flex-col justify-center items-center mt-10 md:w-3/5'>
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
    <div className='flex flex-col'>
       
        <div className='flex justify-center items-center '>Sélectionnez option ajout de champ</div>
        <div className='flex flex-col items-center md:flex-row p-1'>
            <div className='flex flex-col justify-center items-center border w-full bg-slate-400 md:h-96 md:w-1/2 m-2 p-2'>
                <div className='flex flex-col  md:h-full'>
                    <div className='self-center'>
                        <FontAwesomeIcon icon={faCloud} size="2x" width={24}/>
                    </div>
                    <div className='text-center mb-1'>
                        Télécharger les champs
                    </div>
                    <p className='flex flex-col text-center text-xs w-full mt-2'>
                        Faites glisser et déposez ici ou sélectionnez les fichiers avec les contours du champ pour que le téléchargement démarre
                    </p>
                    <button className='flex flex-col text-white btn bg-green-500 md:mt-7 mt-4'>SELECTIONER LES FICHIERS</button>
                </div>
                <div className='flex flex-col h-full text-wrap  items-center md:mt-0'>
                    
                <div className='flex flex-grow text-center text-xs text-wrap mt-1 md:mt-1'>
                    <span>Les formats pris en charge sont : .kml, .kmz, .geojson, .shp ou zip (contenant des fichiers .shp, .shx, .dbf)</span>
                    <span className='flex items-center'>
                        <span><FontAwesomeIcon icon={faCloud} size="2x" width={22} /></span>
                    </span>
                </div>
                    <div className="flex flex-row justify-center items-center text-wrap mt-2">
                        <form className='flex justify-center items-center'>
                            <label className='w-full text-start'>Telecharger un exemple</label>
                            <select className=" rounded-md py-2 bg-gray-100 z-0 w-1/12">
                                <option></option>    
                                <option>ZIP Fichier compressé</option>
                                <option>KML</option>
                                <option>KMZ</option>
                                <option>GEOJSON</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-start border border-green-700 w-full h-96 bg-slate-200 md:w-1/2 m-2 p-2'>
                <div className='flex flex-col self-start  md:h-56 '>
                    <div className='self-center'>
                        <FontAwesomeIcon icon={faCloud} size="2x" width={24}/>
                    </div>
                    <div className='text-center mb-1'>
                        Tracer le champ sur la carte
                    </div>
                    <div className='flex flex-col text-center text-xs w-full'>
                        Dessinez votre champ sur une carte, en façonnant un polygone avec un outil de dessin
                    </div>
                    <button className='btn bg-green-500 md:mt-7 text-white relative bottom-0'>DESSINER UN CHAMP</button>
                </div>
            </div>
        </div>
            
        <div className='mb-4 px-2 text-xs w-full'>
            Avec le forfait gratuit, vous ne pouvez pas ajouter plus de 100 champs à votre compte.
        </div>
        <p className='px-2 text-xs'>
        Les utilisateurs des plans Essential et Professional peuvent télécharger des champs avec tous les paramètres nécessaires spécifiés dans un seul fichier. 
        Les utilisateurs gratuits peuvent télécharger des champs avec attribut saison uniquement. 
        Si quelque chose ne va pas, veuillez <Link href={"/contact"}>nous contacter</Link>
        </p>
    </div>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    
  </div>
</dialog>    
</div>
  )
}