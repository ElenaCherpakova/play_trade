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
      name: "credentials",
      credentials: {},
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

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const { name, email, sub } = profile;
          await dbConnect();

          const user = await User.findOne({ email });
          // console.log("userExist", user);
          if (!user) {
            const hashPassword = await bcrypt.hash(sub, 10);
            const newUser = new User({
              id: sub,
              name: name,
              email: email,
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
    },
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        token.user = user;
      }
       if (trigger === "update" && session?.user._id) {
        const fieldsToUpdate = ["name", "email", "location"];
        fieldsToUpdate.forEach(field => {
          if (session[field]) {
            token.user[field] = session[field];
          }
        });
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        const { _id, name, email, sub, location } = token.user;
        session.user._id = session.user._id || _id || sub;
        session.user.name = name || session.user.name;
        session.user.email = email || session.user.email;
        session.user.location = location || session.user.location;
      }
      console.log("SESSION", session)
      return session;
    }
  },

  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as PATCH };
