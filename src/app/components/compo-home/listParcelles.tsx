"use client"
import React, { useState } from 'react';
import FiltreParcelles from './filtreParcelles';
import Image from 'next/image';
import ellipsis from '../../../../public/images-home/ellipsis-v-icon.svg';

// Définition des types TypeScript pour la parcelle
type Parcelle = {
    forme: string;
    nom: string;
};

const MenuDeroulant = () => {
    const [menuOuvert, setMenuOuvert] = useState(false);

    const toggleMenu = () => {
        setMenuOuvert(!menuOuvert);
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu} className="flex items-center justify-end w-8 h-8  hover:bg-gray-200 focus:outline-none">
                <Image
                    src={ellipsis}
                    alt="image satellite"
                    className='w-3 h-3'
                />
            </button>

            {menuOuvert && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                    <ul className="py-1">
                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Modifier</a></li>
                        <li><a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Supprimer</a></li>
                        {/* Ajoutez d'autres options de menu ici */}
                    </ul>
                </div>
            )}
        </div>
    );
};

const ListParcelles: React.FC = () => {
    const parcelles: Parcelle[] = [
        { forme: 'forme1', nom: 'Parcelle 1' },
        { forme: 'forme2', nom: 'Parcelle 2' },
        { forme: 'forme3', nom: 'Parcelle 3' },
        { forme: 'forme4', nom: 'Parcelle 4' },
        { forme: 'forme3', nom: 'Parcelle 5' },
        { forme: 'forme3', nom: 'Parcelle 6' },
        { forme: 'forme3', nom: 'Parcelle 7' },
        { forme: 'forme3', nom: 'Parcelle 8' },
    ];

    return (
        <div className='flex flex-col items-center mt-2 border bg-gray-100 border-green-500 rounded-2xl'>
            <div className='flex flex-col overflow-y-scroll' style={{ height: '64vh' }}>
                <div className='flex flex-grow text-2xl justify-center items-center text-green-500 px-2'>
                    Listes des parcelles
                </div>
                <div className='mb-2 md:h-20 w-full'><FiltreParcelles /></div>
                {parcelles.map((parcelle, index) => (
                    <div key={index} className='flex items-center border border-green-900 m-4 rounded-2xl'>
                        <div className='mr-10 ml-2 border border-spacing-8 border-green-950'>{parcelle.forme}</div>
                        <div className='flex items-center'>
                            <span>{parcelle.nom}</span>
                            <MenuDeroulant />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListParcelles;