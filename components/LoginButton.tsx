"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';

const LoginButton = () => {
    const { data: session } = useSession();

    console.log('buton',session)

    const handleSignout = () => {
        signOut();
    }



  if(session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={session.user?.image!} alt="@shadcn" />
            <AvatarFallback>{session.user?.name![0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Accounts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/create">
                Create Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignout} className='text-red-700'>
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      )
  }

  return <Button onClick={() => signIn('google')}> 
          <Image src="/google.png" alt="" width={15} height={15} /> Log In
        </Button>
}

export default LoginButton