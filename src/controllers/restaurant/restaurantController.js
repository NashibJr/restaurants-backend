import Restaurant from "../../models/restaurant/restaurant.js";
import RestaurantService from "../../services/restaurant/restaurantService.js";

const restaurantController = {
  create: async (req, resp, next) => {
    try {
      const data = await RestaurantService.create(req.body);
      return resp.status(200).json({
        restaurant: data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
      });
    }
  },

  getRestaurants: async (req, resp, next) => {
    try {
      const data = await RestaurantService.getRestaurants();
      return resp.status(200).json({
        restaurants: data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
      });
    }
  },

  deleteRestaurant: async (req, resp, next) => {
    try {
      const { id } = req.params;
      const data = await RestaurantService.deleteRestaurant(id);
      return resp.status(200).json({
        restaurants: data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
      });
    }
  },

  updateResataurant: async (req, resp, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const restaurant = await RestaurantService.updateRestaurant(id, body);
      return resp.status(200).json({
        restaurant,
        message: "Successfully updated!",
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
      });
    }
  },

  singleRestaurant: async (req, resp, next) => {
    try {
      const { id } = req.params;
      const data = await RestaurantService.singleRestaurant(id);
      return resp.status(200).json({
        restaurant: data,
      });
    } catch (error) {
      return resp.status(500).json({
        message: "Internal server error",
      });
    }
  },

  uploadImage: async (req, res, next) => {
    const fileName = req.originalname;
    const { id } = req.params;
    const data = await RestaurantService.uploadImage(id, fileName);
    return res.status(200).json({
      restaurant: data,
    });
  },
};

export default restaurantController;
