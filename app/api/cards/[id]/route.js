import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import { getSession } from "next-auth/react";
import Card from "@/models/Card";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

export async function GET(req, res) {
  await dbConnect();
  //receive id from url
  const id = req.url.split("cards/")[1];

  // Find card in the database
  const card = await Card.findOne({
    _id: id
    // createdBy: userId
  });
  console.log(card);
  if (!card) {
    return NextResponse.json({ success: false, message: `No card with id: ${id}` }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: card }, { status: 200 });
}

export async function PATCH(req, res) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  // receive parameters from req
  const id = req.url.split("cards/")[1];
  const {
    body: { name, price, currency, shippingCost, quantity }
  } = req;

  if (!name || !price || !currency || !shippingCost || !quantity) {
    return NextResponse.json(
      { success: false, message: "Name, price, currency, shipping cost and quantity fields cannot be empty" },
      { status: 400 }
    );
  }
  const card = await Card.findByIdAndUpdate({ createdBy: userId }, id, body, {
    new: true,
    runValidators: true
  });
  // console.log(card);
  if (!card) {
    return NextResponse.json({ success: false, message: `No card with id ${id}` }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: card }, { status: 200 });
}

//delete data
export async function DELETE(req, res) {
  await dbConnect();
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
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
}
// export default async function handler(req, res) {
//   const { id, method } = req;

//   await dbConnect();

//   switch (method) {
//     case "GET" /* Get a model by its ID */:
//       try {
//         const card = await Card.findById(id);
//         if (!card) {
//           return res.status(400).json({ success: false });
//         }
//         res.status(200).json({ success: true, data: card });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case "PUT" /* Edit a model by its ID */:
//       try {
//         const card = await Card.findByIdAndUpdate(id, req.body, {
//           new: true,
//           runValidators: true
//         });
//         if (!card) {
//           return res.status(400).json({ success: false });
//         }
//         res.status(200).json({ success: true, data: card });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case "DELETE" /* Delete a model by its ID */:
//       try {
//         const deletedCard = await Card.deleteOne({ _id: id });
//         if (!deletedCard) {
//           return res.status(400).json({ success: false });
//         }
//         res.status(200).json({ success: true, data: {} });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }
