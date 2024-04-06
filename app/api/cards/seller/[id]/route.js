import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getToken } from "next-auth/jwt";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

//GET all cards created by seller

export async function GET(req, res) {
  await dbConnect();
  try {
    const id = req.url.split("seller/")[1];
    const token = await getToken({ req });
    console.log("token", token);
    console.log("id", id);
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all cards of the seller from the database
    const cards = await Card.find({ createdBy: id });
    if (!cards) {
      return NextResponse.json({ success: false, message: error.message || "No cards found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: cards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
