import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongo/dbConnect";
import createAssociatedModels from "@/utils/createAssociatedModels";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await dbConnect();
        try {
          // Check if the user already exists in the database
          const user = await User.findOne({ email });
          console.log(user)
          if (user) {
            const isPasswordCorrect = await user.comparePassword(password);
            if (isPasswordCorrect) {
              return user;
            } else {
              return null; // Incorrect password
            }
          } else {
            return null; // User not found
          }
        } catch (error) {
          console.error("Error occurred during authorization:", error);
          return null; // Return null for unsuccessful authentication
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
            await createAssociatedModels(savedUser);

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
    signIn: "/"
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
