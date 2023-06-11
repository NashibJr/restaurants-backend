import { Router } from "express";
import Usercontroller from "../../controllers/restaurant/user/userController.js";

const userRouter = Router();

userRouter.post("/users", Usercontroller.login);

export default userRouter;
