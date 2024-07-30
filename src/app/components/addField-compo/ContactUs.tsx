"use client"

import React, { useState } from 'react';

import { redirect } from 'next/navigation';
import Link from 'next/link';
// import { useRouter } from 'next/router';


type Props = {};

export default function ContactUs({}: Props) {
    const [showModal, setShowModal] = useState(true);
    
    
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        // setShowModal(false);
        redirect("/home");
    };

    // const router = useRouter();

    // const goToDest = () => {
    //   router.push({
    //     pathname: '/home',
    //     query: { source: 'contact' }
    //   });
    // };

    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            {showModal && (
                <dialog id="my_modal_3" className="modal modal-open">
                    <div className="modal-box">
                        <form method="dialog">
                            <div className='flex flex-col'>
                                <div className='text-center my-5'>Contact us</div>
                                <div className='flex flex-row justify-between'>
                                    <label className='input input-bordered w-5/12 flex flex-col items-start gap-2'>
                                        <div className='text-xs text-start justify-start'>FirstName *</div>
                                        <input type="text" className="grow" />
                                    </label>
                                    <label className='input input-bordered w-5/12 flex flex-col items-start gap-2'>
                                        <div className='text-xs text-start justify-start'>LastName *</div>
                                        <input type="text" className="grow" />
                                    </label>
                                </div>
                                <div className='flex flex-row pt-4'>
                                    <label className='input input-bordered w-full flex flex-col items-start gap-2'>
                                        <div className='text-xs text-start justify-start'>Email *</div>
                                        <input type="text" className="grow" />
                                    </label>
                                </div>
                                <div className='flex flex-row pt-4'>
                                    <select className='select select-bordered w-full' name="" id="">
                                        <span className="text-xs block">Email *</span>
                                        <option disabled selected>Select an option</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </div>
                                <div className='flex flex-row pt-4'>
                                    <textarea className="textarea textarea-bordered w-full" placeholder="Please describe your request in detail *"></textarea>
                                </div>
                                <div className='btn w-full text-white bg-green-500 mt-5'>SEND</div>
                            </div>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}><Link href="/home">✕</Link></button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
}