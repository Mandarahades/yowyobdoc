import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCloud } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <div className='flex flex-col lg:w-1/2 my-5 justify-center items-center self-center border border-gray-700 p-5'> 
        <div className=''>Sélectionnez l'option d'ajout de champ</div>
        <div className='flex flex-col items-center lg:flex-row p-2'>
            <div className='flex flex-col justify-center items-center border border-green-700 w-full h-96 bg-green-500 md:w-1/2 m-2 p-2'>
                <div className='mx-2 md:mb-1 self-center'>
                    <FontAwesomeIcon icon={faCloud} size="6x" width={24}/>
                </div>
                <div className='text-center mb-3'>
                    Télécharger les champs
                </div>
                <div className='text-center text-sm w-full'>
                    Faites glisser et déposez ici ou sélectionnez les fichiers avec les contours du champ pour que le téléchargement démarre
                </div>
                <div className='mt-5 flex flex-col justify-center items-center'>
                    <button className='btn btn-primary'>SELECTIONER LES FICHIERS</button>
                    <div className='flex text-center text-sm w-full'>
                        Les formats pris en charge sont : .kml, .kmz, .geojson, .shp ou zip 
                        (contenant des fichiers .shp, .shx, .dbf)<span><FontAwesomeIcon icon={faCloud} size="6x" width={22}/></span>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <form className='flex justify-center items-center'>
                            <label className='w-full text-center'>Telecharger un exemple</label>
                            <select className=" rounded-md py-2 px-4 bg-gray-100 z-0">
                                <option></option>    
                                <option>ZIP Fichier compressé</option>
                                <option>KML</option>
                                <option>KMZ</option>
                                <option>GEOJSON</option>
                                <option>2014</option>
                            </select>
                        </form>
                        </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center border border-green-700 w-full h-96 bg-green-500 md:w-1/2 m-2 p-2'>
                <div className='mx-2 md:mb-1 self-center'><FontAwesomeIcon icon={faCloud} size="6x" width={24}/></div>
                <div className='text-center mb-4'>Tracer le champ sur la carte</div>
                <div className='text-center text-sm'>
                    Dessinez votre champ sur une carte, en façonnant un polygone avec un outil de dessin
                </div>
                <div className='mt-5'>
                    <button className='btn btn-primary'>DESSINER UN CHAMP</button>
                </div>
            </div>
        </div>
        <div className='mb-4 px-2 text-sm w-full'>
            Avec le forfait gratuit, vous ne pouvez pas ajouter plus de 100 champs à votre compte.
        </div>
        <p className='px-2 text-sm'>
        Les utilisateurs des plans Essential et Professional peuvent télécharger des champs avec tous les paramètres nécessaires spécifiés dans un seul fichier. 
        Les utilisateurs gratuits peuvent télécharger des champs avec l'attribut saison uniquement. 
        Si quelque chose ne va pas, veuillez <Link href={"/contact"}>nous contacter</Link>
        </p>
    </div>    
</div>
  )
}