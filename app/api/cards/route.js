import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

export async function GET(req, res) {
  // Establish database connection
  await dbConnect();

  try {
    // Fetch all cards from the database
    const cards = await Card.find({});
    return NextResponse.json({ success: true, data: cards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
  }
}

// Export a named function for handling POST requests
export async function POST(req) {
  console.log(req);
  // Establish database connection
  await dbConnect();

  try {
    const body = await req.json();
    console.log(body);
    // Create a new card based on the request body
    const card = await Card.create(body);

    // res.status(201).json({ success: true, data: card });
    return NextResponse.json({ success: true, data: card }, { status: 201 });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ success: false });
    return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
  }
}

// export default async function handler(req, res) {
//   console.log(start);
//   const { method } = req;
//   console.log(method);
//   await dbConnect();

//   switch (method) {
//     case "GET":
//       try {
//         const cards = await Card.find({}); /* find all the data in our database */
//         return new NextResponse(JSON.stringify({ success: true, data: cards }), { status: 200 });
//       } catch (error) {
//         return new NextResponse(JSON.stringify({ success: false, message: "something wrong" }), { status: 400 });
//       }
//     case "POST":
//       try {
//         console.log(req.body);
//         const card = await Card.create(req.body); /* create a new model in the database */
//         NextResponse.status(201).json({ success: true, data: pet });
//         // return new NextResponse(JSON.stringify({ success: true, data: card }), { status: 201 });
//       } catch (error) {
//         return new NextResponse(JSON.stringify({ success: false, message: "something wrong" }), { status: 400 });
//       }
//     default:
//       return new NextResponse(JSON.stringify({ success: false, message: "something wrong" }), { status: 400 });
//   }
// }
