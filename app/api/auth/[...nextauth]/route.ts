import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (!data) {
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
    async jwt({ token, user }) {
      // If user just signed in, fetch and attach user ID from Supabase
      if (token.email) {
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("email", token.email)
          .single();

        if (data) {
          token.user_id = data.id; // Store user ID in JWT token
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any}) {
      session.user.user_id = token.user_id
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET, // Required for NextAuth encryption
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
