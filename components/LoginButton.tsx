"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

const LoginButton = () => {
    const { data: session } = useSession();


    const handleSignout = () => {
        signOut();
    }



  if(session) {
    return (
      // <Button onClick={() => handleSignout()}>Signout</Button>
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
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="create">
                Create Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignout}>
              Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      )
  }

  return <Button onClick={() => signIn('google')}>SignIn with google</Button>
}

export default LoginButton