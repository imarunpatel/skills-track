import MainImage from '@/public/undraw_online-resume_z4sp.svg';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import { IPost } from "@/models/Post";
import Link from 'next/link';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Home() {

  const data = await getData();
  const posts: { success: boolean; data: IPost[] } = data;


  return (
    <div className=" bg-white  dark:bg-black">
      {/* min-h-[calc(100vh-3rem)] */}
      <section className="max-w-6xl mx-auto px-3 flex gap-8 py-30 ">
        <div className="flex-1 flex gap-8 flex-col justify-center">
            <h1 className="text-5xl font-bold">Unlock Your Learning Potential: <br/> Learn, Share, Grow</h1>
            <p className="text-neutral-600">
              A platform where you can write and share your thoughts, engage in meaningful discussions, and showcase your skills to the world. Create a professional career profile to highlight your expertise and share it with recruiters to unlock new opportunities.
            </p>
        </div>
        <div className="flex-1 flex items-center">
          <Image src={MainImage} alt="Main Image" />
        </div>
      </section>

      <section className={`max-w-6xl mx-auto px-3 flex gap-20 pb-40 `}>
        <div className="flex-1">
          <h2 className="flex gap-2 mb-2">Latest discussions: <TrendingUp /> </h2>
          <ul>
            {
              posts.data.slice(0, 20).map(post => (
                <li key={post.id} className="bg-gray-100 border-b-[1px] flex border-blue-800">
                  <Link href={`/posts/${post.slug}`} className='px-2 py-1 flex-1'>
                    <span className="text-neutral-400">#</span> <span>{post.title}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        {/* <div className="flex-1">
          <h2>Trending discussions:</h2>
          <ul>
            <li className="bg-blue-200 px-2 py-1">
              <span className="text-neutral-400">#</span> <span>Top programming language of 2025</span>
            </li>
          </ul>
        </div> */}
      </section>

      <section className="bg-[url('/subscribe-bg.png')] bg-cover bg-center bg-no-repeat h-50">
          <div className="max-w-2xl mx-auto px-3 flex items-center h-full gap-10">
              {/* <div className="flex  gap-4"> */}
              <Input className="h-12 bg-white" placeholder="eg: example@email.com" />
              <Button className="h-12">Get Started</Button>
            {/* </div> */}
          </div>
      </section>
    </div>
  );
}
