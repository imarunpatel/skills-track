// import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Fetch all posts
export async function GET() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
                .from('posts')
                .select(`*, users(display_name, avatar_url)`).order("created_at", { ascending: false })
        
        if(error) throw error;

        return NextResponse.json({ success: true, data })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) { 
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// Create post
export async function POST(req: Request) {
    try {
        const supabase = await createClient();

        const { data: user_session } = await supabase.auth.getSession();

        const user_id = user_session.session?.user.id;
        
        const { title, slug, content, cover_image_url, published, created_at, updated_at } = await req.json();
        const { data, error } = await supabase.from('posts').insert([{ title, slug, content, cover_image_url, published, user_id, created_at, updated_at }]);

        if(error) throw error;

        return NextResponse.json({ success: true, data })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}