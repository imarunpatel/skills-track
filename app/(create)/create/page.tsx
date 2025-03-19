import React from 'react'
import CreatePostClient from './CreatePostClient'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const CreatePostPage = async () => {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect('/')
  }
  
  return (
    <CreatePostClient />
  )
}

export default CreatePostPage