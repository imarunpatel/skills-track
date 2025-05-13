import MainImage from '@/public/undraw_online-resume_z4sp.svg';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Book, Brain, Globe, Lightbulb, TrendingUp, Users } from "lucide-react";
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
            <h1 className="text-5xl font-bold">Master Frontend Interviews with ease</h1>
            <p className="text-neutral-600">
              Master HTML, CSS, JavaScript, and Web Fundamentals with curated, interview-focused content. Practical guides, real-world insights, and community discussions — all in one place.
            </p>
            <Link href="coding-questions"><Button variant="rounded" className="h-9 w-40">Start Learning <ArrowRight /> </Button></Link>
        </div>
        <div className="flex-1 flex items-center">
          <Image src={MainImage} alt="Main Image" />
        </div>
      </section>

      <section className='max-w-6xl mx-auto px-3 flex gap-20 pb-30 '>
        <ul>
          <li className='flex gap-2 items-center mb-2'>
            <Lightbulb /> No BS, Interview-Ready Content
          </li>
          <li className='flex gap-2 items-center mb-2'>
            <Brain /> Deep Dive into Web Fundamentals
          </li>
          <li className='flex gap-2 items-center mb-2'>
            <Users /> Learn & Grow with the Frontend Dev Community
          </li>
        </ul>
      </section>


      <section className='max-w-6xl mx-auto px-3 gap-20 pb-30 '>
        <h2 className='mb-4 text-3xl font-bold text-muted'>What's Coming Soon</h2>
        <ul>
          <li className='flex gap-2 items-center mb-2'>
            <Book /> HTML to Advanced CSS Concepts..
          </li>
          <li className='flex gap-2 items-center mb-2'>
          <Globe /> JavaScript from the Ground Up  
          </li>
          <li className='flex gap-2 items-center mb-2'>
            <Globe /> How the Web Works (System Design Basics)  
          </li>
          <li className='flex gap-2 items-center mb-2'>
          <Globe /> Frontend Interview Questions & Tips
          </li>
          <li className='flex gap-2 items-center mb-2'>
          <Globe /> Premium Deep-Dives (Optional)
          </li>
        </ul>
      </section>


      {/* <section className={`max-w-6xl mx-auto px-3 flex gap-20 pb-40 `}>
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
      </section> */}

      <section className="bg-[url('/subscribe-bg.png')] flex flex-col w-full justify-center bg-cover bg-center bg-no-repeat h-50">
          <div className='max-w-6xl mx-auto px-3 py-4 text-center text-2xl'>
            Subscribe to our newsletter
          </div>
          <div className="max-w-2xl w-full mx-auto px-3 flex items-center  gap-5">
              {/* <div className="flex  gap-4"> */}
              <Input className="h-12 bg-white rounded-3xl" placeholder="eg: example@email.com" />
              <Button variant="rounded" className="h-12">Subscribe</Button>
            {/* </div> */}
          </div>
      </section>
    </div>
  );
}
