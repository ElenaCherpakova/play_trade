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
  console.log(req.url.split("cards/")[1]);
  const id = req.url.split("cards/")[1];
  // const {
  //   // user: { userId },
  //   params: { id: dataId }
  // } = req.query;
  try {
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
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something wrong" }, { status: 400 });
  }
}

export async function PATCH(req, res) {
  await dbConnect();
  // console.log(req);
  const id = req.url.split("cards/")[1];
  const {
    body: { name, price, currency, shippingCost, quantity }
    // user: { userId },
  } = req;
  const body = await req.json();
  if (name === "" || price === "" || currency === "" || shippingCost === "" || quantity === "") {
    return NextResponse.json(
      { success: false, message: "Name, price, currency, shipping cost and quantity fields cannot be empty" },
      { status: 400 }
    );
  }
  const card = await Card.findByIdAndUpdate(id, body, {
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
  // console.log(req);
  const id = req.url.split("cards/")[1];
  // const {
  //   user: { userId },
  //   params: { id: dataId }
  // } = req;
  const card = await Card.findOneAndDelete({
    _id: id
    // createdBy: userId
  });
  if (!card) {
    return NextResponse.json({ success: false, message: `No card with id ${id}` }, { status: 404 });
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
