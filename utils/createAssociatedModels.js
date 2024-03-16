import { models, model } from "mongoose";
import SellerSchema from "@/models/Seller";
import BuyerSchema from "@/models/Buyer";

async function createAssociatedModels(newUser) {
  if (newUser.role === "user") {
    const SellerModel = models.Seller || model("Seller", SellerSchema);
    await SellerModel.create({ userId: newUser._id });
    const BuyerModel = models.Buyer || model("Buyer", BuyerSchema);
    await BuyerModel.create({ userId: newUser._id });
  }
}
export default createAssociatedModels;
