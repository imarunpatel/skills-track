// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for write access
// );

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if user exists in Supabase
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (!data) {
        // If user doesn't exist, insert into Supabase
        const { error: insertError } = await supabase.from("users").insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        ]);
        if (insertError) {
          console.error("Error inserting user:", insertError);
          return false; // Deny sign-in on error
        }
      }

      return true; // Allow sign-in
    },
    async session({ session, token }) {
      if (session?.user) {
        // Fetch user data from Supabase and attach user ID
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("email", session.user.email)
          .single();
        if (data) {
          session.user.id = data.id;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Required for NextAuth encryption
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
