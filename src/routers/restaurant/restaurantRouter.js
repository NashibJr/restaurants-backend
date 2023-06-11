import { Router } from "express";
import restaurantController from "../../controllers/restaurant/restaurantController.js";
import authorization from "../../middlewares/authorization.js";
import multer from "multer";

const restaurantRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/src/images`);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    req.originalname = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

restaurantRouter.post("/restaurants", restaurantController.create);
restaurantRouter.get(
  "/restaurants",
  authorization,
  restaurantController.getRestaurants
);
restaurantRouter.get("/restaurants", restaurantController.getRestaurants);
restaurantRouter.get("/restaurants/:id", restaurantController.singleRestaurant);
restaurantRouter.put(
  "/restaurants/:id",
  restaurantController.updateResataurant
);
restaurantRouter.delete(
  "/restaurants/:id",
  restaurantController.deleteRestaurant
);

restaurantRouter.post(
  "/restaurants/upload/:id",
  upload.single("image"),
  restaurantController.uploadImage
);

restaurantRouter.get("/restaurants/download/:img", async (req, res, next) => {
  const { img } = req.params;
  res.download(`${process.cwd()}/src/images/${img}`);
});

export default restaurantRouter;
