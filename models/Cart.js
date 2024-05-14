import { Schema, model, models } from "mongoose";

const CartItemSchema = new Schema({
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [CartItemSchema]
});

const Cart = models.Cart || model("Cart", CartSchema);
export default Cart;
