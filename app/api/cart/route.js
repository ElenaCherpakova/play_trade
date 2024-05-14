import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import Cart from "@/models/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Card from "@/models/Card";
/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

// export default async function GET(req, res) {
//   await dbConnect();
//   console.log(req)
//   const session = await getServerSession({ req, authOptions });
//   console.log("session", session);
//   if (!session || !session.user) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//   }
// }

export async function POST(req, res) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log("SESSION", session);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { userId, cardId } = await req.json();
  console.log("USERID", userId);
  console.log("CARDID", cardId);

  const card = await Card.findById(cardId);
  console.log("CARD", card);
  if (!card || card.available !== "available" || card.quantity <= 0) {
    return NextResponse.json({ success: false, message: "Card is not available or out of stock" }, { status: 400 });
  }

  try {
    const cart = (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });

    const item = cart.items.find(item => item.cardId.equals(cardId));
    if (item) {
      if (item.quantity + 1 > card.quantity) {
        return NextResponse.json(
          { success: false, message: "Cannot add more than available quantity" },
          { status: 400 }
        );
      }
      item.quantity += 1;
    } else {
      cart.items.push({ cardId, quantity: 1 });
    }

    await cart.save();
    return NextResponse.json({ success: true, data: cart }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
