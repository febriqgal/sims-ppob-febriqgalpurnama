import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.URL_API}/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        const user = data.data;
        cookies().set("token", `${user.token}`);

        const resProfile = await fetch(`${process.env.URL_API}/profile`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const dataa = await resProfile.json();
        const profile = dataa.data;
        profile.token = data.data.token;

        if (profile) {
          return profile;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.jti = user.token;
        token.token = user.token;
        token.name = `${user.first_name + " " + user.last_name}`;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.user.token = token.token;
      session.user.id = token.id;

      return session;
    },
  },
  pages: { signIn: "/auth/login" },
});

export { handler as GET, handler as POST };
