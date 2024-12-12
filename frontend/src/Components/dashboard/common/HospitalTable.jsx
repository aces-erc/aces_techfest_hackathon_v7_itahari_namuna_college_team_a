import React from 'react'
import { Link } from 'react-router-dom'

const HospitalTable = () => {
    return (
        <div className="container">
            <div className="flex justify-between items-center">
                <h1 className="mb-8">Manage Hospital</h1>
                <Link to='/insurance/dashboard/addHospital'>
                    <button className='bg-primary p-2 px-4 rounded-md'>Add Hospital</button>
                </Link>
            </div>

            <table className="text-left w-full">
                <thead className="bg-black flex text-white w-full">
                    <tr className="flex w-full mb-4">
                        <th className="p-4 w-1/4">S.N</th>
                        <th className="p-4 w-1/4">Hospital name</th>
                        <th className="p-4 w-1/4">Address</th>
                        <th className="p-4 w-1/4">Action</th>
                    </tr>
                </thead>
                <tbody
                    className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full"
                    style={{ height: "50vh" }}
                >
                    {Array(7).fill(null).map((_, index) => (
                        <tr key={index} className="flex w-full mb-4">
                            <td className="p-4 w-1/4">Dogs</td>
                            <td className="p-4 w-1/4">Cats</td>
                            <td className="p-4 w-1/4">Birds</td>
                            <td className="p-4 w-1/4 flex gap-4"><button className='bg-red-600 p-1 px-2 rounded-md'>Delete</button>
                                <button className='bg-blue-600 p-1 px-2 rounded-md'>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HospitalTable