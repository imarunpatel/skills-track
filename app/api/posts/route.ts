import { supabaseAdmin } from "@/lib/supabase";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Fetch all posts
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
                .from('posts')
                .select(`*, users(name, image)`).order("created_at", { ascending: false })

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
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, slug, content, cover_image_url, published, user_id, created_at, updated_at } = await req.json();
        const { data, error } = await supabaseAdmin.from('posts').insert([{ title, slug, content, cover_image_url, published, user_id, created_at, updated_at }]);

        if(error) throw error;

        return NextResponse.json({ success: true, data })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}