import { Schema, model, models } from "mongoose";

const SellerListingSchema = new Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User who is selling
    required: true
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: "Card", // Reference to the Card being listed for sale
    required: true
  },
  cardsForSaleId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

const SellerListing = models.SellerListing || model("SellerListing", SellerListingSchema);
export default SellerListing;
