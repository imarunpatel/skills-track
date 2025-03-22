"use client";
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button';
import slugify from 'slugify';
import { BoldIcon, Code, Heading1, Heading2, Heading3, ImageIcon, Italic, LinkIcon, List, ListOrdered, Loader2, Quote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSession } from 'next-auth/react';
import { generateSlugPostFix } from '@/lib/helpers/slugPostfix';
import { IEditorControl } from '@/models/EditorControl';
import { useRouter } from 'next/navigation';
import PreviewPost from './MarkdownPreview';

const controls: IEditorControl[] = [
  { label: 'H1', prefix: '# ', suffix: '', placeholder: 'Heading 1', icon: <Heading1 /> },
  { label: 'H2', prefix: '## ', suffix: '', placeholder: 'Heading 2', icon: <Heading2 /> },
  { label: 'H3', prefix: '### ', suffix: '', placeholder: 'Heading 3', icon: <Heading3 /> },
  { label: 'Bold', prefix: '**', suffix: '**', placeholder: 'bold text', icon: <BoldIcon /> },
  { label: 'Italic', prefix: '_', suffix: '_', placeholder: 'italic text', icon: <Italic /> },
  { label: 'Link', prefix: '[', suffix: '](url)', placeholder: 'link text', icon: <LinkIcon /> },
  { label: 'Image', prefix: '![', suffix: '](url)', placeholder: 'alt text', icon: <ImageIcon /> },
  { label: 'Code', prefix: '`', suffix: '`', placeholder: 'code', icon: <Code /> },
  { label: 'Code Block', prefix: '```\n', suffix: '\n```', placeholder: 'code here', multiline: true, icon: "Code block" },
  { label: 'List', prefix: '- ', suffix: '', placeholder: 'list item', icon: <List /> },
  { label: 'Ordered List', prefix: '1. ', suffix: '', placeholder: 'list item', icon: <ListOrdered /> },
  { label: 'Quote', prefix: '> ', suffix: '', placeholder: 'quote', icon: <Quote /> },
  { label: 'Embed URL', prefix: '<iframe src="', suffix: '" width="100%" height="400" frameborder="0"></iframe>', placeholder: 'https://example.com', icon: "embed" },
  { label: 'Horizontal Rule', prefix: '\n---\n', suffix: '', placeholder: '', icon: "line" },
];

const CreatePostClient = () => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const session = useSession();
  const router = useRouter();

  const handleSetMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value)
  }

  const handlePublish = async () => {
    try {
      if (!title || !markdown) {
        throw new Error('Title and content are required');
      }

      if (!coverImage) {
        throw new Error('Cover image is required');
      }
      
      const generatedSlug = `${slugify(title)}-${generateSlugPostFix()}`;
      const post = {
        title,
        slug: generatedSlug,
        content: markdown,
        cover_image_url: coverImage,
        published: true,
        user_id: session.data?.user.user_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
      })
      const data = await response.json();

      if(data.success) {
        const url = `posts/${generatedSlug}`
        router.push(url)
      }
      
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  const insertControl = (control: IEditorControl) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = markdown.substring(selectionStart, selectionEnd);
    
    // Determine what text to insert
    const insertText = selectedText || control.placeholder || '';
    
    // Create new text with the control syntax
    const newText = 
      markdown.substring(0, selectionStart) +
      control.prefix +
      insertText +
      control.suffix +
      markdown.substring(selectionEnd);
    
    // Update state
    setMarkdown(newText);
    
    // Calculate cursor position based on whether we're dealing with multiline or single line
    const cursorOffset = control.multiline ? control.prefix.length : 0;
    
    // Set focus and cursor position on next render
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        
        if (selectedText) {
          // If there was selected text, place cursor at the end of the inserted content
          textareaRef.current.setSelectionRange(
            selectionStart + control.prefix.length + insertText.length + control.suffix.length,
            selectionStart + control.prefix.length + insertText.length + control.suffix.length
          );
        } else {
          // If no text was selected, place cursor between prefix and suffix or at appropriate position for multiline
          textareaRef.current.setSelectionRange(
            selectionStart + control.prefix.length + cursorOffset,
            selectionStart + control.prefix.length + insertText.length + cursorOffset
          );
        }
      }
    }, 0);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input')?.click();
  }

  const [uploadLoading, setUploadLoading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append('file', file!);
      formData.append('user_id', session.data?.user.user_id);
      
      const imageResponse = await fetch('/api/posts/upload', { method: 'POST', body: formData });

      if (!imageResponse.ok) 
        throw new Error('Failed to upload image');
      

      const { url } = await imageResponse.json();
      setCoverImage(url);
      setUploadLoading(false);
    } catch (err) {
      console.error('err', err)
      setUploadLoading(false);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      uploadImage(file)
    } else {
      alert('Please upload a valid JPG or PNG image.');
    }
  }

   // Function to add URL embed
   const addEmbed = () => {
    const url = prompt('Enter URL to embed:');
    if (!url) return;
    
    insertControl({
      label: 'Custom Embed',
      prefix: '<iframe src="',
      suffix: '" width="100%" height="400" frameborder="0"></iframe>',
      placeholder: url,
      icon: ''
    });
  };

  const addCodeBlock = () => {
    const language = prompt('Enter programming language (e.g., javascript, python):') || '';
    
    insertControl({
      label: 'Custom Code Block',
      prefix: '```' + language + '\n',
      suffix: '\n```',
      placeholder: 'Enter code here',
      multiline: true,
      icon: ''
    });
  };

  
  return (
    <div className='flex-1 flex flex-col bg-gray-200 overflow-auto'>
        { !
        preview ?
          <div className='w-full mx-auto max-w-4xl flex-1 flex flex-col px-3 overflow-y-auto'>
            <div className="flex flex-col items-end relative pt-3 bg-contain bg-center bg-cendter bg-no-repeat" style={{ backgroundImage: coverImage ? `url(${coverImage})` : "none" }}>
          {/* <div className='w-full max-w-60 h-30'>
                  {
                  coverImage && 
                    <div className='relative'>
                      <img src={coverImage} alt="" className='max-w-60 max-h-30 mx-auto'/>
                      <CircleX color="red" onClick={() => setCoverImage(null)} className='absolute -top-2 -right-2 bg-gray-200 rounded-full' />
                    </div>
                  }
              </div> */}
              <div className='flex gap-3'>
                {coverImage && <Button onClick={() => setCoverImage(null)} variant="destructive" size="sm">Remove</Button>}
                <Button size="sm" variant="outline" className='mr-4' onClick={() => handleButtonClick()} disabled={uploadLoading}>
                  {uploadLoading ? "Uploading..." : (coverImage ? <span>Replace Image</span> : <span>Add Cover Image</span>)}
                </Button>
              </div>
              <input id="file-input" onChange={(e) => handleFileChange(e)} type="file" className='bg-green-400 hidden' ref={fileInputRef} />
              <div className='bg-gradient-to-b from-slate-200/5 to-gray-300 w-full mt-4'>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} style={{ fontSize: "2em" }} className='mt-4 h-16 mb-3 text-3xl font-bold border-0 shadow-none focus-visible:ring-0' placeholder='Enter post title here...'/>
              </div>
            </div>

            {/* Controls */}
            <TooltipProvider>
              <div className='w-full flex text-black items-center bg-gray-300  px-3 '>
                {controls.map((control, key) => 
                  <Tooltip key={key}>
                      <TooltipTrigger onClick={() => control.label === 'Code Block' ? addCodeBlock() : 
                         control.label === 'Embed URL' ? addEmbed() : 
                         insertControl(control)}>
                        <div className='hover:text-white hover:bg-blue-700 px-3 py-2 cursor-pointer'>
                          {control.icon}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{control.label}</p>
                      </TooltipContent>
                  </Tooltip>)
                }
              </div>
            </TooltipProvider>
            <textarea ref={textareaRef} value={markdown} onChange={(e) => handleSetMarkdown(e)} className='w-full h-full bg-white flex-1 p-2 outline-0 text-xl' placeholder='Start writing here...'></textarea>
          </div>
        : <PreviewPost markdown={markdown} />
        }

            
        {/* </div> */}
        <div className='bg-gray-200 flex gap-3 max-w-4xl mx-auto w-full py-2 text-white px-3'>
          <Button onClick={() => handlePublish()} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Publish
          </Button>
          <Button onClick={() => setPreview((prev) => !prev)} className='text-black' variant="outline">
            { preview ? "Continue Editing" : "Preview"}
          </Button>
        </div>
    </div>
  )
}

export default CreatePostClient


