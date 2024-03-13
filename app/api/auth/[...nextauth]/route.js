import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongo/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await dbConnect();

          // Check if the user already exists in the database
          let user = await User.findOne({ email });
          if (!user) {
            throw new Error("User with this email doesn't exist");
          }
          // If the user exists, validate the password
          const isPasswordCorrect = await user.comparePassword(password);
          if (!isPasswordCorrect) {
            throw new Error("Invalid email or password");
          }

          return user;
        } catch (error) {
          throw new Error("Authentication failed");
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({ profile: { sub }, user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await dbConnect();
          const userExist = await User.findOne({ email });
          if (!userExist) {
            const hashPassword = await bcrypt.hash(sub, 10);
            const newUser = new User({
              name: name,
              email: email,
              password: hashPassword,
              authProvider: true
            });
            const savedUser = await newUser.save();
            if (savedUser) {
              return { status: 201, body: { user: savedUser } }; // Indicate successful creation with status 201
            } else {
              throw new Error("Failed to save user");
            }
          }
        } catch (error) {
          console.error("Error occurred during Google sign-in:", error);
          throw new Error("Failed to sign in with Google");
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.sub = token.sub;
      }
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
