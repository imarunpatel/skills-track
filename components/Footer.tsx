import React from 'react'
import { DotIcon } from 'lucide-react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='w-full flex flex-col justify-center gap-1 px-3 py-8 bg-gray-800'>
        {/* <div className='flex-1 flex items-center gap-3'> */}
            {/* <Image src={Logo} alt='Logo' width={35} height={35} /> */}
            <p  className='text-neutral-300 text-center'>
            Skills Tack: A platform where you can write and share your thoughts, engage in meaningful discussions, and showcase your skills to the world.
            </p>
            {/* <p className='text-neutral-500 text-sm '>
                
            </p> */}
        {/* </div> */}
        <div className='flex flex-wrap text-neutral-300 mx-auto'>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400' /> Abut US</Link>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> Privacy Policy</Link>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> Terms & Conditions</Link>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> Site Map</Link>
        </div>
        <div className='flex flex-wrap text-neutral-300 mx-auto'>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> info@skillstrack.in</Link>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> Facebook</Link>
                <Link href="" className='flex text-sm items-center'><DotIcon className='text-green-400'/> Twitter</Link>
        </div>
        <p className='text-center text-sm text-neutral-500'>Copyright - {new Date().getFullYear()} | Skills Track</p>
    </div>
  )
}

export default Footer