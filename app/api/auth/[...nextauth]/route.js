import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongo/dbConnect";
import createAssociatedModels from "@/utils/createAssociatedModels";
/**
 *
 * @param {Account} account
 * @param {AuthUser} user
 */
const login = async credentials => {
  const { email, password } = credentials;
  await dbConnect();
  try {
    // Check if the user already exists in the database
    const user = await User.findOne({ email });
    if (!user) throw new Error("Missing credentials");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new Error("Missing credentials");
    return user;
  } catch (error) {
    console.error("Error occurred during authorization:", error);
    throw new Error("Failed to login");
  }
};
export const authOptions = {
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.name) session.user.name = token.name;
      if (token?.email) session.user.email = token.email;
      if (token?.sub) session.user.sub = token.sub;

      return session;
    },
    async signIn({ user, account, profile }) {
      await dbConnect();
      const { email, sub } = profile;
      if (account.provider === "google") {
        console.log("user", user);
        console.log("account", account);
        console.log("profile", profile.sub);

        try {
          const userExist = await User.findOne({ email });
          console.log("userExist", userExist);
          if (!userExist) {
            const hashPassword = await bcrypt.hash(sub, 10);
            const newUser = new User({
              name: profile.name,
              email: profile.email,
              password: hashPassword,
              authProvider: true
            });

            const savedUser = await newUser.save();
            await createAssociatedModels(savedUser);

            if (savedUser) {
              return { status: 201, body: { user: savedUser } };
            } else {
              throw new Error("Failed to save user");
            }
          }
        } catch (error) {
          console.error("Error occurred during Google sign-in:", error);
          throw new Error("Failed to sign in with Google");
        }
      }
      return true;
    }
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        return {
          ...profile,
          id: profile.sub
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
