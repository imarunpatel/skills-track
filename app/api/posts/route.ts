import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Fetch all posts
export async function GET() {
    try {
        const { data, error } = await supabase
                .from('posts')
                .select(`*, users(name, image)`)

        if(error) throw error;

        return NextResponse.json({ success: true, data })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// Create post
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, slug, content, cover_image_url, published, user_id, created_at, updated_at } = await req.json();
        const { data, error } = await supabase.from('posts').insert([{ title, slug, content, cover_image_url, published, user_id, created_at, updated_at }]);

        if(error) throw error;

        return NextResponse.json({ success: true, data })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}