import { Schema, model, models } from "mongoose";

const BuyerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cardsPurchasedId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const Buyer = models.Buyer || model("Buyer", BuyerSchema);
export default Buyer;
