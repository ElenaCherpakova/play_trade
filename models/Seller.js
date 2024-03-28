import { Schema, model, models } from "mongoose";
import User from "./User";

const SellerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  feedback: [
    {
      type: String,
      maxLength: 255
    }
  ],
  numberOfSales: {
    type: Number,
    default: 0
  },
  reqToBeSeller: {
    type: Boolean,
    default: false
  },
  isRequestedAt: {
    type: Date
  }
});

SellerSchema.pre("save", async function (next) {
  try {
    if (this.isModified("reqToBeSeller") && this.reqToBeSeller && !this.isRequestedAt) {
      // check if user is provided an address
      const user = await User.findById(this.userId);
      if (!user.address) {
        throw new Error("Usee should provide an address to become a seller");
      }
      this.isRequestedAt = new Date();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Seller = models.Seller || model("Seller", SellerSchema);
export default Seller;
