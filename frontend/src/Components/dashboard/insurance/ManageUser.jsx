import React from 'react'
import UserTable from '../common/UserTable'

const ManageUser = () => {
    return (
        <>
            <UserTable />
            <div className="flex w-full justify-between text-lg items-center mt-8 pr-8">
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                        <svg class="shrink-0 size-4 text-gray-400 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                    <input type="text" class="py-2 ps-10 pe-16 block w-[24rem] bg-black text-white border-gray-200 border-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="Search...." />
                </div>
                <span>

                    <span className='text-primary font-bold '>Total User: </span> 4
                </span>
            </div>
        </>
    )
}

export default ManageUser