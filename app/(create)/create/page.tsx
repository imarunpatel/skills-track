import React from 'react'
import CreatePostClient from './CreatePostClient'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function CreatePostPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/')
  }

  
  return (
    <CreatePostClient />
  )
}

// export default CreatePostPage