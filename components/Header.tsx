import React from 'react'
import Link from 'next/link'
import Logo from '../public/logo.png';
import Image from 'next/image';
import LoginButton from './LoginButton';

const Header = () => {
  return (
    <header className='dark:bg-neutral-500 w-full'>
        <div className='max-w-6xl h-12 mx-auto px-3 flex justify-between items-center'>
            <Link href="/">
                <Image src={Logo} alt="" width={30} />
            </Link>
            <nav aria-label='Main navigation'>
                <ul className='flex gap-4 items-center'>
                    <li><Link href="/posts">Posts</Link></li>
                    <li>
                        <LoginButton />
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header