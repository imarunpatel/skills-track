"use client";

import Header from '@/components/Header';
import React, { useState } from 'react'
import Logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import gfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import breaks from 'remark-breaks';
import { Button } from '@/components/ui/button';
import slugify from 'slugify';
import { Loader2 } from 'lucide-react';


const CreatePost = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [title, setTitle] = useState<string>('testing1111');
  const [loading, setLoading] = useState(false);

  const handleSetMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value)
  }

  const handlePublish = async () => {
    console.log(JSON.stringify({
      title,
      slud: slugify(title),
      content: markdown,
      user_id: "5e9b7d7a-096a-4f37-acc5-630d2dd089e5"
    }))
    // return
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug: slugify(title),
          content: JSON.stringify(markdown),
          user_id: "5e9b7d7a-096a-4f37-acc5-630d2dd089e5"
        }),
      })
      const data = await response.json();
      console.log('res', data);
      
      setLoading(false);
    }
    catch {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex flex-col mx-auto'>
        <div className='py-2 w-full bg-gray-300 px-3'>
          <Link href="/">
                <Image src={Logo} alt="" width={30} height={30} />
          </Link>
        </div>
        <div className='flex flex-1 gap-2 bg-gray-300 p-4'>
            <div className='w-full flex flex-col max-w-6xl ml-auto'>
              <div className='w-full h-8 flex items-center bg-gray-800 text-neutral-50 px-2'>
                Controls
              </div>
              <textarea value={markdown} onChange={(e) => handleSetMarkdown(e)} className='w-full bg-white h-full p-2 outline-0 text-xl' placeholder='Start writing here...'></textarea>
            </div>

            <div className='flex flex-col w-full max-w-6xl mr-auto'>
              <div className='h-8 flex items-center px-2 bg-gray-800 text-neutral-50'>
                Live Preview
              </div>
              <div className='flex-1 bg-white overflow-scroll p-2 rounded reactMarkDown prose prose-md max-w-full prose-gray dark:prose-invert'>
                <Markdown 
                    children={markdown}
                    remarkPlugins={[gfm, breaks]}
                    components={{
                    img(props: any) {
                      return (
                        // <span className='relative'>
                          <Image {...props} className='w-full rounded-md my-6' width={200} height={200} />
                        // </span>
                      )
                    },
                    code(props: any) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, "")}
                            language={match[1]}
                            style={vscDarkPlus}
                        />
                        ) : (
                        <code
                            {...rest}
                            className={`${
                            className || ""
                            } dark:bg-gray-800 bg-gray-200 p-1 rounded before:content-[''] after:content-['']`}
                        >
                            {children}
                        </code>
                        );
                    },
                    }}
                />
              </div>
            </div>
        </div>
        <div className='bg-gray-300 flex justify-end py-2 text-white px-3'>
            <Button onClick={handlePublish} disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Publish
            </Button>
        </div>
    </div>
  )
}

export default CreatePost