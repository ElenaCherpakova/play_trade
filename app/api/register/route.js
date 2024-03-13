import { model, models } from "mongoose";
import dbConnect from "@lib/mongo/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import SellerSchema from "@/models/Seller";
import BuyerSchema from "@/models/Buyer";
// import useAuthUser from '@/store/useAuthUser';

export const POST = async (req) => {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = await new User({
      name,
      email,
      password, // <-password is hashed  in the User model
      role: "user"
    });
    await newUser.save();
    const token = newUser.createJWT();

    if (newUser.role === "user") {
      const SellerModel = models.Seller || model("Seller", SellerSchema);
      await SellerModel.create({ userId: newUser._id });
      const BuyerModel = models.Buyer || model("Buyer", BuyerSchema);
      await BuyerModel.create({ userId: newUser._id });
    }
    return NextResponse.json(
      {
        message: "User saved successfully",
        user: newUser,
        token
      },

      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};