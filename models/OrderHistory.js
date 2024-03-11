import { Schema, model, models } from "mongoose";

const OrderHistorySchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const OrderHistory = models.OrderHistorySchema || model("OrderHistory", OrderHistorySchema);
export default OrderHistory;
