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
  try {
    // Fetch all cards from the database
    const cards = await Card.find({});
    if (!cards) {
      return NextResponse.json({ success: false, message: error.message || "No cards found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: cards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}

//Create card
export async function POST(req) {
  await dbConnect();
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;
    const body = await req.json();
    body.createdBy = userId;
    console.log(body)
    const card = await Card.create(body);
    //console.log(card)
    if (!card) {
      return NextResponse.json({ success: false, message: error.message || "Error saving a card" }, { status: 400 });
    }
    return new NextResponse(JSON.stringify({ success: true, data: card }), {
      status: 201 
    })
  } catch (error) {
    let status = 500;
    let message = 'Server error';
    let errors = []; 
    if (error.name === 'ValidationError') {
      // Extracting specific validation errors for a ValidationError
      errors = Object.values(error.errors).map(val => val.message);
      message = 'Validation error';
      status = 400; // Client error - Bad Request
    }

    const responseData = JSON.stringify({
      success: false,
      message,
      errors
    });

    return new NextResponse(responseData, {
      status: status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

//Delete all cards
export async function DELETE(req) {
  await dbConnect();
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;
    const cards = await Card.deleteMany({ createdBy: userId });
    if (!cards) {
      console.log(error)
      return NextResponse.json({ success: false, message: error.message || "No cards found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
