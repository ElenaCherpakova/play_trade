import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import Card from "@/models/Card";

export async function GET(req, res) {
  // Establish database connection
  await dbConnect();

  try {
    // Fetch all cards from the database
    const cards = await Card.find({});
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

// Export a named function for handling POST requests
export async function POST(req = NextRequest) {
  // Establish database connection
  await dbConnect();

  try {
    const body = await req.json();
    console.log(body);
    // Create a new card based on the request body
    const card = await Card.create(body);

    // res.status(201).json({ success: true, data: card });
    return new NextResponse(JSON.stringify(card), { status: 200 });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ success: false });
    return new NextResponse(JSON.stringify({ success: false, message: "something wrong" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
}
