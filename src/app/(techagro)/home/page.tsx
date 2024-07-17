import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="flex flex-row p-5">
        <div className="w-9/12 h-screen mx-5 flex flex-col justify-center items-center flex-shrink-0" >
            <div className="w-full flex flex-row justify-start items-end mb-1 text-4xl" style={{ height: '5vh' }}>LOGGO KROPSERVE</div>
            <div className="w-full flex flex-row  mt-3 mb-3 justify-start" style={{ height: '100vh' }}>
                <div className="w-1/12 flex bg-green-500 justify-center mr-2">icons</div>
                <div className="w-11/12 flex bg-red-400 justify-center items-center">images satellite</div>
            </div>
        </div>
        <div className="w-3/12 h-screen flex flex-col flex-shrink-0">
            <div className='flex flex-row justify-center border border-spacing-2 rounded-full border-red-500 mb-3 items-end bg-white'>
                <div className="flex flex-col items-end justify-end">
                    <div className="flex flex-row justify-end">
                        <div className="w-1/3 m-3 flex justify-center bg-gray-200">icne1</div>
                        <div className="w-1/3 m-3 flex justify-center bg-blue-300">icne2</div>
                        <div className="w-2/3 m-3 flex justify-center bg-green-400">icne3</div>
                    </div>
                </div>    
            </div>
           
            <div className="flex flex-col items-center justify-center">
                <div className="w-full mt-3 mb-3 flex justify-center text-2xl text-white">Superficie totale</div>
                <div className="w-full flex flex-row mt-3 mb-3 justify-center items-center" style={{ height: '22vh' }}>
                    <div className='flex flex-col w-3/12 mx-2 '>
                        <div className="h-32 bg-green-500" style={{ height: '15vh' }}></div>
                        <div className='text-xs'>culture1</div>
                    </div>
                    <div className='flex flex-col w-3/12  mx-2 '>
                        <div className=" bg-red-600" style={{ height: '15vh' }}></div>
                        <div className='text-xs'>culture2</div>
                    </div>
                    <div className='flex flex-col w-3/12 mx-2 '>
                        <div className=" bg-yellow-300" style={{ height: '15vh' }}></div>
                        <div className='text-xs'>culture3</div>
                    </div>
                    <div className='flex flex-col w-3/12 mx-2 '>
                        <div className=" bg-yellow-900" style={{ height: '15vh' }}></div>
                        <div className='text-xs'>culture4</div>
                    </div>
                </div>            
            </div>    
         
            <div className="flex flex-col mt-3 text-black border border-gray-950 rounded-xl" style={{ height: '100vh' }}>
                    <div className="flex flex-row text-2xl justify-center">
                        <h1>Liste des parcelles</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center my-3">
                        <h1 className='m-5'>champ 1  3ha</h1>
                        <h1 className='m-5'>champ 1  4ha</h1>
                        <h1 className='m-5'>champ 1  5ha</h1>
                        <h1 className='m-5'>champ 1  6,2ha</h1>
                        <h1 className='m-5'>champ 1  7ha</h1>
                        <h1 className='m-5'>champ 1  8,5ha</h1>
                    </div>
            </div>
             
        </div>
    </div>
  ) 
}