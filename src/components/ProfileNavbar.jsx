import React, {useState} from 'react'
import useStore from '../hooks/useStore'
import {Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProfileNavbar() {

    const {handleClickProfile, currentProfile} = useStore()
    const {user, error, logout} = useAuth({middleware: 'auth'})

    return (
        <>
            <nav className="w-full py-4 bg-blue-800 shadow">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
                    <nav>
                        <ul className="flex items-center justify-between font-semibold text-sm text-white uppercase no-underline">
                            <li><Link className="hover:text-gray-200 hover:underline px-4" to='/'>Shop</Link></li>
                            <li><Link className="hover:text-gray-200 hover:underline px-4">About</Link></li>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-1 text-lg no-underline text-white pr-6">
                        <button
                            className='inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-500 ease-in-out hover:border-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 hover:text-black hover:bg-white hover:scale-110'
                            type='button'
                        >
                            profile
                        </button>

                        <button
                            type='button'
                            onClick={logout}    
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                        Laka Shop
                    </a>
                    <p className="text-lg text-gray-600">
                        Lorem Ipsum Dolor Sit Amet
                    </p>
                </div>
            </header>
        
            <nav className="w-full py-4 border-t border-b bg-gray-100">
                <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2 gap-10">
                    <Link
                        to="/profile"
                        onClick={()=>handleClickProfile(false)}
                        className={`${currentProfile === false ? "bg-blue-800 text-white scale-125":""} transition duration-500 rounded py-2 px-4 mx-2 uppercase`}
                    >
                        Profile
                    </Link>
                    <Link
                        to="/profile/orders"
                        onClick={()=>handleClickProfile(true)}
                        className={`${currentProfile === true ? "bg-blue-800 text-white scale-125":""} transition duration-500 rounded py-2 px-4 mx-2 uppercase`}
                    >
                        Orders
                    </Link>
                </div>
            </nav>

        </>
    )
}

export default ProfileNavbar