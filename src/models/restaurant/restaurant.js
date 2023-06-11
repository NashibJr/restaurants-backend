import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
