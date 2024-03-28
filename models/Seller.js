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

  isRequestedAt: {
    type: Date,
    required: function(){
      return this.isSeller === true
    }
  }
});

SellerSchema.pre("save", async function (next) {
  try {
    if (this.isModified("isSeller") && this.isSeller && !this.isRequestedAt) {
      // Check if a user is provided an address before to become a seller 
      const user = await User.findById(this.userId);
      if (!user.address) {;
        throw new Error("User should provide an address to become a seller");
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
