import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params } : { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: post, error } = await supabase
        .from('posts')
        .select('*, author:users(display_name, avatar_url)').eq('slug', slug).single();
    if(error || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
}