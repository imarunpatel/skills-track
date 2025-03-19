import React from 'react'
import CreatePostClient from './CreatePostClient'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/utils/authOptions'

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