import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        });
        const data = await res.json();
        const user = data.data;
        const resProfile = await fetch(`${process.env.URL_API}/profile`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const dataa = await resProfile.json();
        const profile = dataa.data;

        if (profile) {
          return profile;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = `${user.first_name + " " + user.last_name}`;
      }
      console.log(token);

      return token;
    },
  },
  pages: { signIn: "/auth/login" },
});

export { handler as GET, handler as POST };
