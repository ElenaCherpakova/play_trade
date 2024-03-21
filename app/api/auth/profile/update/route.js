import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";
// import { session } from "next-auth/session";
/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 *
 */

// GET a user profile
export async function PUT(req, res) {
  await dbConnect();
  const session = await getServerSession({req});
  console.log("session", session);

  const user = await User.findOne({});
}


