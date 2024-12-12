import React from 'react'
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-[5rem] w-full flex justify-between items-center px-8'>
            <div className="my-grid w-[5rem]">
                <img src={Logo} alt="" />
            </div>
            <Link to='/login'>
                <button className='rounded-md bg-primary hover:bg-bgbtnHover my-transition p-2 px-4 '>Login</button>
            </Link>
        </div>
    )
}

export default Navbar