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
export const PATCH = async (req, res) => {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  console.log("PUT IS HERE", session);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user._id;
    const body = await req.json();
    const { name, email, location, trigger } = body;
    if (!name || !email || !location || !trigger) {
      return NextResponse.json({ success: false, message: "Name and Email are required" }, { status: 400 });
    }
    // console.log("NAME", name);
    // console.log("Email", email);
    // console.log("location", location);
    // console.log("userId", userId);
    const updateUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true
    });
    if (!updateUser) {
      return NextResponse.json({ success: false, message: "Profile not found" }, { status: 400 });
    }

    if (trigger === "update" && session.user._id) {
      session.user = updateUser;
    }
    return NextResponse.json({ success: true, message: "Your profile is updated", data: updateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
