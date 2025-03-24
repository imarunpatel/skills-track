import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ActivityIcon, HashIcon, HomeIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimeAgo } from '@/lib/helpers/formateDate';
import { IPost } from '@/models/Post';

async function getPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/`, { cache: "no-store" });
    return res;
}

const Posts = async () => {

    const data = await getPosts();
    const posts: { success: boolean; data: IPost[] } = await data.json();
    
  return (
    
    <div className='flex-1 w-full h-full max-w-6xl mx-auto px-3 flex gap-6 py-8'>
        <aside className='bg-white w-40 rounded px-2 py-3 max-h-100 hidden md:block'>
            <ul className="space-y-1 font-medium">
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <HomeIcon width={20} />
                    <span className="ms-3">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <ActivityIcon width={20} />
                    <span className="ms-3">Activity</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <HashIcon width={20} />
                    <span className="ms-3">Popular</span>
                    </a>
                </li>
            </ul>
        </aside>
        <div className='flex-1 rounded px-2'>
            {
                posts.data.map((post) => (
                    <Link key={post.id} href={`/posts/${post.slug}`} className='bg-white rounded overflow-hidden flex flex-col gap-2 py-3 mb-4'>
                        <div className='flex gap-2 px-3'>
                            <Avatar className='h-8 w-8'>
                                <AvatarImage src={post.users.avatar_url} alt="@shadcn" />
                                <AvatarFallback>{post.users.display_name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className='text-sm'>{post.users.display_name}</div>
                                <div className='text-xs'>{formatTimeAgo(post.updated_at)} </div>
                            </div>
                        </div>
                        <div className='px-3'>
                            <h2 className='text-xl'>{post.title}</h2>
                        </div>
                        <div className='max-h-80 overflow-hidden text-center bg-black'>
                            <Image className='h-full mx-auto' src={post.cover_image_url} alt='Skills Track' style={{ width: 'auto', height: 'auto' }} width={500} height={400} />
                        </div>
                    </Link>
                ))
            }
        </div>
        {/* <div className='flex-1 flex gap-4 w-full'>
            <aside className='w-30 flex-1 bg-white px-2 py-4 rounded h-full'>
                
            </aside>
            <div className='flex-1 bg-white px-2 py-4 rounded'>
                dfds
            </div>
        </div> */}
          {/* <div className='grid grid-cols-4 gap-4 py-12'>
                {
                    posts.data.map((item, index) => (
                        <Link key={index} href={`/posts/${item.slug}`} className='h-40 bg-blue-400 flex flex-col'>
                            <div className='flex-1'>
                                <Image className='w-full' src={item.cover_image_url ? item.cover_image_url : "https://cdn.sanity.io/images/1y3qidb3/production/d766725a6888309e8748f2f69dda8f15d78aec5b-1920x1080.png"} alt="" width={200} height={200} />
                            </div>
                            <div className='bg-gray-100 h-10 overflow-hidden py-2 px-2'>
                                <h3>{item.title}</h3>
                            </div>
                        </Link>
                    ))
                }
          </div> */}
    </div>
  )
}

export default Posts