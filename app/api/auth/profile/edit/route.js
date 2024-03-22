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
export const GET = async (req, res) => {
  await dbConnect();
  const session = await getServerSession(authOptions);

  console.log(session);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session?.user._id;
    console.log(userId);
    const user = await User.findOne({});
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
