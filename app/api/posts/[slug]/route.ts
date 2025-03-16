import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";



export async function GET(req: Request, context : { params: { slug: string } }) {
    const { slug } = await context.params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('*, author:users(id, name, email, image)').eq('slug', slug).single();

    if(error || !post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
}