import dbConnect from "@lib/mongo/dbConnect";
import { NextResponse } from "next/server";

import User from "@/models/User";

/**
 * @param {NextResponse} res
 * @param {NextRequest} req
 */

export const POST = async req => {
  await dbConnect();
  const requestBody = await req.json();
  try {
    const { password, email } = requestBody;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ error: "User does not exist" }), { status: 400 });
    }

    existingUser.password = password;
    existingUser.passwordResetToken = undefined;
    existingUser.passwordResetExpiry = undefined;

    await existingUser.save();
    return new NextResponse(JSON.stringify({ message: "User's password is updated" }), {
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
