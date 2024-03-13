import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongo/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await dbConnect();

          // Check if the user already exists in the database
          let user = await User.findOne({ email });
          console.log(user);
          if (!user) {
            // If the user does not exist, create a new user
            user = new User({
              email: email,
              password: password // You may want to hash the password here before saving it
            });
            await user.save();
          } else {
            // If the user exists, validate the password
            const passwordMatch = await user.comparePassword(password);
            if (!passwordMatch) {
              return null; // Return null if the password does not match
            }
          }

          return user; // Return the user if authentication is successful
        } catch (error) {
          throw new Error(error);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log(user, account);
      if (account.provider === "google") {
        try {
          const { name, email, sub } = user;

          await dbConnect();
          const userExist = await User.findOne({ email });
          const hashPassword = await bcrypt.hashSync(sub, 10);
          if (!userExist) {
            const newUser = new User({
              name: name,
              email: email,
              password: hashPassword,
              authProvider: true // Setting authProvider to true specifically for Google registration
            });
            const res = await newUser.save();
            if (res.status === 200 || res.status === 201) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.sub = user.sub;
        token.authProvider = user.authProvider; // Adding authProvider to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.sub = token.sub;
      session.user.authProvider = token.authProvider; // Adding authProvider to the session
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signin: "/"
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
