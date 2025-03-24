import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import React from 'react'
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from "remark-gfm";
import breaks from 'remark-breaks';
import { formateDate } from '@/lib/helpers/formateDate';

async function getPost(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`, { cache: "no-store" });
    return res.json();
}

const PostPage = async ({ params }: { params:  Promise<{ slug: string }> }) => {
    const { slug} = await params;
    const post  = await getPost(slug);

    if (!post || post.error) {
        return <h1>Post not found</h1>;
      }

  return (
    <div className='max-w-6xl w-full mx-auto py-4'>
        {
        post.cover_image_url && 
            <div className='max-h-[400px] overflow-hidden w-full px-3'>
                <Image 
                    src={post.cover_image_url}
                    alt="" 
                    className='w-full h-full rounded object-cover object-center  '
                    width={700} 
                    height={200} 
                />
            </div>
        }
        <div className='mx-3 px-5 py-4 bg-white'>
            <div className='flex gap-2 items-center'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={post.author.avatar_url} alt="@shadcn" />
                    <AvatarFallback>{post.author.display_name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className='font-bold'>{post.author.name}</p>
                    <p className='text-sm text-neutral-500'>{formateDate(post.updated_at)}</p>
                </div>
            </div>
            <h1 className='text-3xl mt-3 mb-1 font-bold'>{post.title}</h1>
            <div className="tags text-sm text-neutral-500">
                <a href="">#programming</a>
            </div>
            <div className='py-8 reactMarkDown prose prose-md max-w-full prose-gray dark:prose-invert'>
                <Markdown 
                    remarkPlugins={[gfm, breaks]}
                    components={{
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    img(props: any) {
                        return (
                        // <span className='relative'>
                            <Image {...props} className='w-full rounded-md my-6' alt="Skills Track" width={700} height={200} />
                        // </span>
                        )
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    code(props: any) {
                        const { children, className, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            language={match[1]}
                            style={vscDarkPlus}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
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
                >
                    {post.content}
                </Markdown>
            </div>
        </div>
    </div>
  )
}

export default PostPage