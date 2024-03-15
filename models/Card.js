import { Schema, model, models } from "mongoose";

const CardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the card name"],
    maxLength: 50
  },
  set: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ["USD", "CAD"],
    required: true
  },
  shippingCost: {
    type: Number,
    required: [true, "Please provide the shipping cost"],
    min: 0
  },
  description: {
    type: String,
    maxLength: 1000
  },
  conditions: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.category === "Sport Card") {
          return ["near mint", "excellent", "very good", "poor"].includes(value.toLowerCase());
        } else {
          return ["near mint", "lightly played", "moderately played", "heavily played", "damaged"].includes(
            value.toLowerCase()
          );
        }
      },
      message: props => `${props.value} is not a valid condition for this category of card.`
    }
  },
  category: {
    type: String,
    enum: ["Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"]
  },
  imageURL: {
    type: String,
    match: [/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/, "Invalid image URL format"]
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Or should we setup default value to 1??
    max: 1000,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value"
    }
  },
  available: {
    type: String,
    enum: ["available", "sold"]
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Card = models.Card || model("Card", CardSchema);
export default Card;
