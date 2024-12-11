import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-[5rem] w-full flex justify-between items-center px-8'>
            <h2>LOGO</h2>
            <Link to='/login'>
                <button className='rounded-md bg-primary hover:bg-bgbtnHover my-transition p-2 px-4 '>Login</button>
            </Link>
        </div>
    )
}

export default Navbar