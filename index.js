import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import restaurantRouter from "./src/routers/restaurant/restaurantRouter.js";
import userRouter from "./src/routers/user/userRouter.js";
import Cors from "cors";

config();

const app = express();

const main = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      app.use(Cors());
      app.use((req, resp, next) => {
        req.header("Access-Control-Allow-Origin", "*");
        next();
      });
      app.use(
        express.json(),
        express.urlencoded({ extended: false }),
        restaurantRouter,
        userRouter
      );
      console.log("connected to the database");
    });
    app.listen(3001, () => console.log("connected to the port 3001"));
  } catch (error) {
    console.log(error);
  }
};

main();
