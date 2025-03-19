import React, { useState } from "react";
import Markdown from "react-markdown";
import Image from 'next/image';
import gfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter';
import breaks from 'remark-breaks';
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { v4 as uuidv4 } from 'uuid';

const PreviewPost = ({ markdown } : { markdown: string }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
    const copyToClipboard = (text: string, index: number) => {
  
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      });
    };
  
    return (
      <div className="flex-1 overflow-auto">
        <div className='w-full flex flex-col max-w-4xl mx-auto px-3'>
          <div className='w-full rounded my-3 p-3 bg-white reactMarkDown prose prose-md prose-gray dark:prose-invert'>
            <Markdown 
                remarkPlugins={[gfm, breaks]}
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                img(props: any) {
                  return (
                      <Image {...props} className='w-full rounded-md my-6' alt="Skills Track" width={200} height={200} />
                  )
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code(props: any) {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
    
                    // Generate unique indices for each code block
                    const codeIndex = uuidv4();
                    const codeContent = String(children).replace(/\n$/, "");
    
                    return match ? (
                      <div className='relative group'>
                        <button 
                          onClick={() => copyToClipboard(codeContent, parseInt(codeIndex))}
                          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedIndex === parseInt(codeIndex) ? 'Copied!' : 'Copy'}
                        </button>
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            language={match[1]}
                            style={anOldHope}
                            customStyle={{
                              margin: '1rem 0',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              padding: '2.5rem 1rem 1rem 1rem' // Extra padding at top for copy button
                            }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
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
              {markdown}
          </Markdown>
          </div>
        </div>
      </div>
    )
  }
  
  
  export default PreviewPost;