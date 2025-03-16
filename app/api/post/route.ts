import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { title, slug, content, user_id } = await req.json();
        const { data, error } = await supabase.from('posts').insert([{ title, slug, content, user_id }]);

        if(error) throw error;

        return NextResponse.json({ success: true, data })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}