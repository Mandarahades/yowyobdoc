import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCloud } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


type Props = {}

export default function selectAddFieldOption({}: Props) {
  return (
    <div className='flex flex-col'>
        <p>Selectioner option ajout du champ</p>
        <div className='flex flex-col md:flex-row'>
            <div className='flex flex-col'>
                <div className='mx-2 md:mb-1 '><FontAwesomeIcon icon={faCloud} size="6x" width={24}/></div>
                <div className='text-center'>charger un fichier</div>
                <div className='text-center'>
                    Glissez-déposez ici ou sélectionnez des fichiers avec les contours de champ pour commencer le téléchargement
                </div>
                <div className='mt-5'>
                    <button className='btn btn-lg btn-primary'>SELECTIONER UN FICHIER</button>
                    <div className='text-center'>
                        Les formats pris en charge sont : .kml, .kmz, .geojson, .shp ou zip (contenant des fichiers .shp, .shx, .dbf)<span><FontAwesomeIcon icon={faCloud} size="6x" width={22}/></span>
                    </div>
                    <div className="flex flex-row justify-center ">
                        <form className=''>
                            <label className='mr-5'>Telecharger un exemple</label>
                            <select className=" rounded-md py-2 px-4 bg-gray-100 z-0">
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
            <div className='flex flex-col'>
                <div className='mx-2 md:mb-1 '><FontAwesomeIcon icon={faCloud} size="6x" width={24}/></div>
                <div className='text-center'>charger un fichier</div>
                <div className='text-center'>
                    Glissez-déposez ici ou sélectionnez des fichiers avec les contours de champ pour commencer le téléchargement
                </div>
                <div className='mt-5'>
                    <button className='btn btn-lg btn-primary'>SELECTIONER UN FICHIER</button>
                </div>
            </div>
        </div>
        <p>
            Sur le plan gratuit, vous ne pouvez pas ajouter plus de 100 champs à votre compte
        </p>
        <p>
            Les utilisateurs des plans Essential et Professional peuvent télécharger des champs avec tous les paramètres nécessaires spécifiés en un seul fichier.
            Les utilisateurs gratuits peuvent télécharger des champs avec seulement l'attribut de saison. 
            Si quelque chose ne va pas, veuillez <Link href={"/contact"}>nous contacter</Link>
        </p>
    </div>
  )
}