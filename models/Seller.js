import { Schema, model, models } from "mongoose";

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
  location: {
    type: String
  }
});

const Seller = models.Seller || model("Seller", SellerSchema);
export default Seller;
