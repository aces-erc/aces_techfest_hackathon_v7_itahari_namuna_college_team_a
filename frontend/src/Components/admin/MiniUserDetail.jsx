import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const MiniUserDetail = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex  w-full justify-center items-center">
                    <div className="my-grid w-1/2">
                        <FaUserCircle className='text-[10rem]' />
                    </div>
                    <div className="flex flex-col w-1/2 pr-8">
                        <span className='flex justify-between text-justify'>
                            <span className='font-bold'>First Name: </span>Sagar
                        </span>
                        <span className='flex justify-between text-justify'>
                            <span className='font-bold'>Middle Name: </span>-

                        </span>
                        <span className='flex justify-between text-justify'>

                            <span className='font-bold'>Last Name: </span>Adikari
                        </span>
                        <span className='flex justify-between text-justify'>
                            <span className='font-bold'>Gender: </span>Male

                        </span>
                        <span className='flex justify-between text-justify'>

                            <span className='font-bold'>Blood Group: </span>B+
                        </span>
                        <span className='flex justify-between text-justify'>
                            <span className='font-bold'>Age: </span>19

                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className='flex gap-8 justify-between'>
                        <span className='font-bold'>Full Address: </span>Itahari-8, khosi
                    </span>
                    <span className='flex gap-8 justify-between'>

                        <span className='font-bold'>Phone number: </span>9812345678
                    </span>
                    <span className='flex gap-8 justify-between'>
                        <span className='font-bold'>Insurance Company: </span> Nepal Life Insurance
                    </span>
                    <div className="bg-black w-full h-[0.1rem] opacity-40"></div>
                    <div className="flex flex-col w-full gap-4 mt-4">
                        <Link to='/user/dashboard/chat/' className='w-full'>
                            <button className='bg-primary p-1 px-2 rounded-md w-full'>open chat bot</button>
                        </Link>
                        <div className="flex justify-between">
                            <Link to='/user/dashboard/Consultation-history/'>
                                <button className='border-2 border-primary p-1 px-2 rounded-md text-primary'>Consultation history</button>
                            </Link>
                            <Link to='/user/dashboard/medical-history/'>
                                <button className='border-2 border-primary p-1 px-2 rounded-md text-primary'>Medical history</button>
                            </Link>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniUserDetail