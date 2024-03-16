import { Schema, model, models } from "mongoose";

const MarketItemSchema = new Schema({
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const MarketSchema = new Schema({
  items: [MarketItemSchema]
});

const Market = models.Market || model("Market", MarketSchema);
export default Market;
