import express from "express";
import * as userController  from "../controllers/userController";
import * as authorize from "../middleware/authorize"
import { jwtAuth } from "../middleware/jwtAuth";
export const userRouter = express.Router({ mergeParams: true});

userRouter.get("/", jwtAuth, authorize.requireAdmin, userController.index);
userRouter.get("/:userId", jwtAuth, authorize.requireOwner, userController.show);
userRouter.post("/", userController.create);
userRouter.put("/:userId", jwtAuth, authorize.requireOwner, userController.edit);
userRouter.delete("/:userId", jwtAuth, authorize.requireAdmin, userController.remove);