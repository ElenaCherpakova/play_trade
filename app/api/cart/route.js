import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo/dbConnect";
import Cart from "@/models/Cart";
import Card from "@/models/Card";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

export async function GET(req, res) {
  await dbConnect();
  const session = await getServerSession({ req, res, ...authOptions });
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.cardId");
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, items: cart.items }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req, res) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user._id;
  const { cardId, quantity } = await req.json();
  if (!userId || !cardId || quantity === undefined) {
    return NextResponse.json({ error: "userId, cardId and quantity are required" }, { status: 400 });
  }
  const card = await Card.findById(cardId);
  console.log("CARD", card);
  if (!cardId || card.available !== "available" || quantity <= 0) {
    return NextResponse.json({ success: false, message: "Card is not available or out of stock" }, { status: 400 });
  }

  try {
    const cart = (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });

    const item = cart.items.find(item => item.cardId.equals(cardId));
    if (item) {
      if (item.quantity + quantity > item.cardId.quantity) {
        return NextResponse.json(
          { success: false, message: "Cannot add more than available quantity" },
          { status: 400 }
        );
      }
      item.quantity += quantity;
    } else {
      cart.items.push({ cardId, quantity });
    }

    await cart.save();
    return NextResponse.json({ success: true, cart }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
export async function PATCH(req, res) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id;
  const { cardId, quantity } = await req.json();
  console.log("quantity back", quantity);
  console.log("cardId back", cardId);

  if (!userId || !cardId || quantity === undefined) {
    return NextResponse.json({ error: "userId, cardId, and quantity are required" }, { status: 400 });
  }

  try {
    const card = await Card.findById(cardId);
    console.log("card", card);
    if (!card) {
      return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
    }

    if (quantity > card.quantity) {
      return NextResponse.json({ success: false, message: "Cannot add more than available quantity" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });
    console.log("cart", cart);
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(item => item.cardId.equals(cardId));
    console.log("itemIndex", itemIndex);
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, message: "Card not found in cart" }, { status: 404 });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return NextResponse.json(
        { success: true, items: cart.items, message: "Item removed from cart" },
        { status: 200 }
      );
    } else {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return NextResponse.json({ success: true, items: cart.items, message: "Cart updated" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, res) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user._id;
  const { cardId } = await req.json();
  if (!userId || !cardId) {
    return NextResponse.json({ error: "userId and cardId are required" }, { status: 400 });
  }
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
    }
    const itemIndex = cart.items.findIndex(item => item.cardId.equals(cardId));
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, message: "Card not found in cart" }, { status: 404 });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return NextResponse.json({ success: true, items: cart.items, message: "Item removed from cart" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
