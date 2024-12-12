import React from 'react'

const ConsultationHistory = () => {
    return (
        <div>
            <table className="text-left w-full">
                <thead className="bg-black flex text-white w-full">
                    <tr className="flex w-full mb-4">
                        <th className="p-4 w-1/4">S.N</th>
                        <th className="p-4 w-1/4">Hospital name</th>
                        <th className="p-4 w-1/4">Address</th>
                        <th className="p-4 w-1/4">Date</th>
                        <th className="p-4 w-1/4">Amount</th>
                        <th className="p-4 w-1/4">Action</th>
                    </tr>
                </thead>
                <tbody
                    className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full"
                    style={{ height: "50vh" }}
                >
                    <tr className="flex w-full mb-4">
                        <td className="p-4 w-1/4">1</td>
                        <td className="p-4 w-1/4">Noble teaching hospital</td>
                        <td className="p-4 w-1/4">Biratnagar</td>
                        <td className="p-4 w-1/4">2024-01-17</td>
                        <td className="p-4 w-1/4">10000</td>
                        <td className="p-4 w-1/4 flex gap-4"><button className='bg-red-600 p-1 px-2 rounded-md'>Delete</button>
                            <button className='bg-blue-600 p-1 px-2 rounded-md'>Edit</button></td>
                    </tr>
                    <tr className="flex w-full mb-4">
                        <td className="p-4 w-1/4">2</td>
                        <td className="p-4 w-1/4">B.P. koirala hospital</td>
                        <td className="p-4 w-1/4">Dharan</td>
                        <td className="p-4 w-1/4">2024-02-28</td>
                        <td className="p-4 w-1/4">2000</td>
                        <td className="p-4 w-1/4 flex gap-4"><button className='bg-red-600 p-1 px-2 rounded-md'>Delete</button>
                            <button className='bg-blue-600 p-1 px-2 rounded-md'>Edit</button></td>
                    </tr>
                    <tr className="flex w-full mb-4">
                        <td className="p-4 w-1/4">3</td>
                        <td className="p-4 w-1/4">Noble teaching hospital</td>
                        <td className="p-4 w-1/4">Biratnagar</td>
                        <td className="p-4 w-1/4">2024-04-12</td>
                        <td className="p-4 w-1/4">5000</td>
                        <td className="p-4 w-1/4 flex gap-4"><button className='bg-red-600 p-1 px-2 rounded-md'>Delete</button>
                            <button className='bg-blue-600 p-1 px-2 rounded-md'>Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ConsultationHistory