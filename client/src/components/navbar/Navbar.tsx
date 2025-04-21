"use client";
import React from 'react'
import { IoIosHome } from "react-icons/io"
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Link from 'next/link';
import { FaMessage } from "react-icons/fa6";
import './Navbar.css'
import LogoutButton from '../logoutButton';




const BottomNavbar: React.FC = () => {
    return (
        <>
            <div className='min-w-full fixed bottom-0 bg-white  flex items-center justify-around h-16 lg:hidden'>
                <div className='flex items-center justify-center'>
                    <Link href={'/'} >   <IoIosHome className='h-24 w-[40%]' /></Link>
                </div>
                <div className='flex items-center justify-center' >
                    <Link href={'/'}>  <IoSearch className='h-24 w-[40%]' /> </Link>
                </div>
                <div className='flex items-center justify-center'>
                    <Link href={'/create'}> <IoIosAddCircle className='h-24 w-[40%]' /></Link>

                </div>
                <div className='flex items-center justify-center'>
                    <Link href={'/message'}>  <FaMessage className='h-24 text-2xl' /></Link>
                </div>

            </div>
        </>
    )
}
const TopNavbar: React.FC = () => {
    return (
        <>
            <div className='fixed top-0 w-full bg-white h-14 flex items-center justify-between '>
                <div className='w-[60%]  flex items-center justify-center pacifico-regular text-4xl lg:w-[40%]'>
                    OneClick
                </div>
                <div className='w-[40%] flex items-center justify-around lg:w-[60%]'>

                    <div className='hidden lg:flex items-center justify-center'>
                        <Link href={'/'} >   <IoIosHome className='h-24 w-[40%]' /></Link>
                    </div>
                    <div className='hidden lg:flex items-center justify-center' >
                        <Link href={'/'}>  <IoSearch className='h-24 w-[40%]' /> </Link>
                    </div>
                    <div className='hidden lg:flex items-center justify-center'>
                        <Link href={'/create'}> <IoIosAddCircle className='h-24 w-[40%]' /></Link>

                    </div>
                    <div className='hidden lg:flex items-center justify-center'>
                        <Link href={'/message'}>  <FaMessage className='h-24 w-[30%] text-2xl' /></Link>
                    </div>
                    <Link href={'/profile'}>  <FaUserCircle className='cursor-pointer  text-3xl' /></Link>
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}

function Navbar() {
    return (
        <>
            <TopNavbar />
            <BottomNavbar />
        </>
    )
}

export default Navbar