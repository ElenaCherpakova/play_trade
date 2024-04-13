import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";

/**
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

//GET seller by id

export async function GET(req, res) {
  await dbConnect();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const idWithParams = req.url.split("seller/")[1];
  const id = idWithParams.split("?")[0];
  if (!id) {
    return NextResponse.json({ success: false, message: "Seller ID not provided" }, { status: 400 });
  }
  const user = await User.findById({ id });
  console.log("user", user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({ user });
}
