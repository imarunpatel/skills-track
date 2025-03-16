import Image from 'next/image'
import React from 'react'
import Logo from '../public/logo.png';
import { LocateIcon, GlobeLock } from 'lucide-react'

const Footer = () => {
  return (
    <div className='max-w-6xl mx-auto w-full flex gap-8 px-3 py-8'>
        <div className='flex-1 flex flex-col gap-3'>
            <Image src={Logo} alt='Logo' width={35} height={35} />
            <p  className='text-neutral-500'>
            Welcome to our website! Our mission is to provide high-quality and insightful content that is relevant to our readers' interests and needs.
            </p>
            <p className='text-neutral-500 text-sm '>
                Copyright - {new Date().getFullYear()} | Skills Track
            </p>
        </div>
        <div className='flex-1'>
            <h4 className='text-lg font-bold'>Out Information</h4>
            <ul className='text-neutral-500'>
                <li className='hover:text-black hover:underline'><a href="">Abut US</a></li>
                <li className='hover:text-black hover:underline'><a href="">Privacy Policy</a></li>
                <li className='hover:text-black hover:underline'><a href="">Terms & Conditions</a></li>
                <li className='hover:text-black hover:underline'><a href="">Site Map</a></li>
            </ul>
        </div>
        <div className='flex-1'>
            <h4 className='text-lg font-bold'>Connect</h4>
            <ul className='text-neutral-500'>
                <li className='hover:text-black hover:underline'><a href="">info@skillstrack.in</a></li>
                <li className='hover:text-black hover:underline'><a href="">Facebook</a></li>
                <li className='hover:text-black hover:underline'><a href="">Twitter</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer