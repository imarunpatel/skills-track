"use client";
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient();

    
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch {
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase.auth])

  const handleSignIn = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
    } catch {
      alert('Error signing in!')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
      try {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        
        if (error) throw error
        setUser(null);
        // Redirect to home page after sign out
      } catch {
        // alert('Error signing out!')
      } finally {
        setLoading(false)
      }
    }

  if(user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.user_metadata.avatar_url} alt="@shadcn" />
            <AvatarFallback>{user.user_metadata.name[0]}</AvatarFallback>
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
            <DropdownMenuItem onClick={() => handleSignOut()} className='text-red-700'>
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      )
  }

  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> {loading && <Loader2 className="animate-spin" /> } Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='mx-auto'>Login Here</DialogTitle>
          <DialogDescription className='mx-auto'>
            Use you social accounts to login
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="px-6 sm:px-0 max-w-sm">
              <button onClick={() => handleSignIn()} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )

  return <Button onClick={() => {}}> 
          <Image src="/google.png" alt="" width={15} height={15} /> Log In
        </Button>
}

export default LoginButton