import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongo/dbConnect";
import User from "@/models/User";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 *
 */

// Update a user profile
export const PUT = async req => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user._id;
    const body = await req.json();
    console.log("userId", body);
    const { name, email, avatar } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name and email are required" }, { status: 400 });
    }

    if (avatar !== undefined) {
      body.imageProfileURL = avatar;
    } else {
      if (body.imageProfileURL === null || body.imageProfileURL === "") {
        delete body.imageProfileURL;
      }
    }
    const updateUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true
    });
    if (!updateUser) {
      return NextResponse.json({ success: false, message: "Profile not found" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Your profile is updated", data: updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message, data: error.data },
      { status: error.statusCode || 500 }
    );
  }
};
