import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getToken } from "next-auth/jwt";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

//GET all cards
//all can watch all cards
export async function GET(req, res) {
  await dbConnect();
  // Fetch all cards from the database
  const cards = await Card.find({});
  if (!cards) {
    return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: cards }, { status: 200 });
}

//Create card
export async function POST(req) {
  await dbConnect();

  const token = await getToken({ req });
  // console.log("token", token);
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;
  // console.log("userId", userId);
  const body = await req.json();
  body.createdBy = userId;
  // console.log(body);
  // Create a new card based on the request body
  const card = await Card.create(body);
  if (!card) {
    return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: card }, { status: 201 });
}

//Delete all cards
export async function DELETE(req) {
  await dbConnect();
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = token.sub;
  const cards = await Card.deleteMany({ createdBy: userId });
  if (!cards) {
    return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: {} }, { status: 200 });
}
