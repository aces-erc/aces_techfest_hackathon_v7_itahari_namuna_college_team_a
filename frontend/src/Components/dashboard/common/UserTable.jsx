import React from 'react'
import { Link } from 'react-router-dom'
import { data } from './moke'

const UserTable = () => {
    return (
        <div className="container">
            <div className="flex justify-between items-center">
                <h1 className="mb-8">Manage user</h1>
                <Link to='/insurance/dashboard/addUser'>
                    <button className='bg-primary p-2 px-4 rounded-md'>Add user</button>
                </Link>
            </div>

            <table className="text-left w-full">
                <thead className="bg-black flex text-white w-full">
                    <tr className="flex w-full mb-4">
                        <th className="p-4 w-1/4">Name</th>
                        <th className="p-4 w-1/4">Email</th>
                        <th className="p-4 w-1/4">Address</th>
                        <th className="p-4 w-1/4">Phone</th>
                        <th className="p-4 w-1/4">Action</th>
                    </tr>
                </thead>
                <tbody
                    className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full"
                    style={{ height: "50vh" }}
                >
                    {
                        data.map((item, index) => {

                            return (
                                item.role === 'PATIENTS' &&
                                <tr key={index} className="flex w-full mb-4">
                                    <td className="p-4 w-1/4">{item.first_name}{item.last_name}</td>
                                    <td className="p-4 w-1/4">{item.email}</td>
                                    <td className="p-4 w-1/4">{item.address}</td>
                                    <td className="p-4 w-1/4">{item.phone}</td>
                                    <td className="p-4 w-1/4 flex gap-4"><button className='bg-red-600 p-1 px-2 rounded-md'>Delete</button>
                                        <button className='bg-blue-600 p-1 px-2 rounded-md'>Edit</button></td>
                                </tr>

                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable