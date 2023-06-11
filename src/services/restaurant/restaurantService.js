import Restaurant from "../../models/restaurant/restaurant.js";

const RestaurantService = {
  create: async (restaurantData) => {
    try {
      // check if the restaurant already exists on the database.
      const { name } = restaurantData;
      const exists = await Restaurant.findOne({ name: name });
      // if it exists, we don't create it.
      if (exists) {
        return {
          message: "Can't create two restaurants with the same brand!",
        };
      }
      // otherwise we create the restaurant.
      let restaurant = await Restaurant.create(restaurantData);
      restaurant = restaurant.toJSON();
      return { ...restaurant, message: "Successfully created restaurant" };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  getRestaurants: async () => {
    try {
      const restaurants = await Restaurant.find({}).sort({ name: 1 });
      return restaurants;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  deleteRestaurant: async (restaurantId) => {
    try {
      let restaurant = await Restaurant.findByIdAndDelete(restaurantId);
      restaurant = restaurant.toJSON();
      return { ...restaurant, message: "Successfully deleted!" };
    } catch (error) {
      return {
        message: "An unexpected error has occured",
      };
    }
  },

  updateRestaurant: async (restaurantId, newData) => {
    try {
      let restaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        newData,
        { new: true }
      );
      return restaurant;
    } catch (error) {
      return {
        message: error.message,
      };
    }
  },

  singleRestaurant: async (restaurantId) => {
    try {
      let restaurant = await Restaurant.findById(restaurantId);
      restaurant = restaurant.toJSON();
      return restaurant;
    } catch (error) {
      return {
        message: "Un expected error has occurred!",
      };
    }
  },

  uploadImage: async (restaurantId, imagePath) => {
    try {
      let restaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        {
          image: `${process.env.SERVER_URL}/restaurants/download/${imagePath}`,
        },
        { new: true }
      );
      restaurant = restaurant.toJSON();
      return { ...restaurant, message: "Successfully uploaded" };
    } catch (error) {
      return {
        message: "An error has occured.",
      };
    }
  },
};

export default RestaurantService;
