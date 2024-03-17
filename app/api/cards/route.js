import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

export async function GET(req, res) {
  const session1 = await getSession({ req });
  const session = await getServerSession({ req });
  console.log("session get", JSON.stringify(session, null, 2));
  console.log("session1", JSON.stringify(session1, null, 2));
  await dbConnect();
  // console.log(req);
  // Fetch all cards from the database
  const cards = await Card.find({});
  if (!cards) {
    return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: cards }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();

  const token = await getToken({ req });
  console.log("token", token);
  const session = await getServerSession({ req });
  console.log("session post", JSON.stringify(session, null, 2));
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;
  console.log("userId", userId);
  const body = await req.json();
  // console.log(body);
  body.createdBy = userId;
  console.log(body);
  // Create a new card based on the request body
  const card = await Card.create(body);
  if (!card) {
    return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: card }, { status: 201 });
}

export async function DELETE(req) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const cards = await Card.deleteMany({ createdBy: userId });
  if (!cards) {
    return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: {} }, { status: 200 });
}
