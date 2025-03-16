import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Post {
    title: string;
    content: string;
    slug: string;
}
const Posts = async () => {

    const data = await fetch('http://localhost:3000/api/posts');
    const posts: { success: boolean; data: Post[] } = await data.json();

  return (
    
    <div className='max-w-6xl mx-auto px-3'>
          <div className='grid grid-cols-4 gap-4 py-12'>
                {
                    posts.data.map((item, index) => (
                        <Link key={index} href={`/posts/${item.slug}`}>
                            <div className='bg-gray-100'>
                                <Image className='w-full' src="https://cdn.sanity.io/images/1y3qidb3/production/d766725a6888309e8748f2f69dda8f15d78aec5b-1920x1080.png" alt="" width={200} height={200} />
                                <h3>{item.title}</h3>
                            </div>
                        </Link>
                    ))
                }
          </div>
    </div>
  )
}

export default Posts