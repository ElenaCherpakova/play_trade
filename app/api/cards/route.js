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
      return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: cards }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}

//Create card
/*export async function POST(req) {
  await dbConnect();
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;
    const body = await req.json();
    body.createdBy = userId;
    // Create a new card based on the request body
    const card = await Card.create(body);
    if (!card) {
      return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: card }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}*/
export async function POST(req) {
  await dbConnect();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return NextResponse.json({ success: false, message: "Form parsing error" }, { status: 500 });
    }

    // Authentication check
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;

    let imageUrl = ""; // Initialize image URL variable
    if (files.image) {
      try {
        const result = await cloudinary.v2.uploader.upload(files.image.filepath);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error(uploadError);
        return NextResponse.json({ success: false, message: "Image upload failed" }, { status: 500 });
      }
    }

    // Adding the userId and imageUrl to the card data
    const cardData = {
      ...fields,
      createdBy: userId,
      imageUrl,
    };

    try {
      const card = await Card.create(cardData);
      if (!card) {
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: card }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: error.toString() }, { status: 400 });
    }
  });
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
      return NextResponse.json({ success: false, message: "No cards found" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
