import dbConnect from "@lib/mongo/dbConnect";
import User from "@/models/User";
// import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
// import useAuthUser from '@/store/useAuthUser';

export const POST = async (req, res) => {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = await new User({
      name,
      email,
      password, // <-password is hashed  in the User model
      role: "user"
    });
    await newUser.save();
    // const { login } = useAuthUser.getState();
    // const token = newUser.createJWT();
    // login({ name, email }, token);

    return NextResponse.json(
      {
        message: "User saved successfully",
        newUser
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
