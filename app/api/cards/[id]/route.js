import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import Card from "@/models/Card";
import formidable from "formidable-serverless";
import cloudinary from "cloudinary"; 

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */
//all can watch single card
export async function GET(req, res) {
  await dbConnect();
  try {
    //receive id from url
    const id = req.url.split("cards/")[1];
    // Find card in the database
    const card = await Card.findOne({
      _id: id
    });
    console.log(card);
    if (!card) {
      return NextResponse.json({ success: false, message: `No card with id: ${id}` }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: card }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}

/*export async function PATCH(req, res) {
  await dbConnect();
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;
    // receive parameters from req
    const id = req.url.split("cards/")[1];
    const body = await req.json();
    const { name, price, currency, shippingCost, quantity } = body;

    if (!name || !price || !currency || !shippingCost || !quantity) {
      return NextResponse.json(
        { success: false, message: "Name, price, currency, shipping cost and quantity fields cannot be empty" },
        { status: 400 }
      );
    }

    const card = await Card.findByIdAndUpdate({ createdBy: userId, _id: id }, body, {
      new: true,
      runValidators: true
    });
    if (!card) {
      return NextResponse.json({ success: false, message: `No card with id ${id}` }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: card }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
*/

// const parseFormData = (req) => new Promise((resolve, reject) => {
//   const form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) reject(err);
//     resolve({ fields, files });
//   });
// });


export async function PATCH(req, res) {
  await dbConnect();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Form parsing error" });
    }

    // Authentication check
    const token = await getToken({ req });
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = token.sub;
    const cardId = req.url.split("cards/")[1];

    // Process image upload if file exists
    let imageUrl = fields.imageUrl; // Default to existing or sent URL
    if (files.image) {
      try {
        const result = await cloudinary.v2.uploader.upload(files.image.filepath);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // Update card with new data, including the new image URL
    try {
      const updatedCard = await Card.findOneAndUpdate(
        { _id: cardId, createdBy: userId },
        { ...fields, imageUrl },
        { new: true, runValidators: true }
      );

      if (!updatedCard) {
        return res.status(404).json({ success: false, message: `No card with id ${cardId}` });
      }

      return res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, message: error.toString() });
    }
  });
}
//delete data
export async function DELETE(req, res) {
  await dbConnect();
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const userId = token.sub;
    //receive id from url
    const id = req.url.split("cards/")[1];
    const card = await Card.findOneAndDelete({
      _id: id,
      createdBy: userId
    });
    if (!card) {
      return NextResponse.json({ success: false, message: `No card with id ${id}` }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 400 });
  }
}
