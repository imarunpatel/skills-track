import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params } : { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data: post, error } = await supabaseAdmin
        .from('posts')
        .select('*, author:users(id, name, image)').eq('slug', slug).single();
        
    if(error || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
}