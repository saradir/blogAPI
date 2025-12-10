import express from "express";
import * as userController  from "../controllers/userController";

export const userRouter = express.Router({ mergeParams: true});

userRouter.get("/", userController.index);
userRouter.get("/:userId", userController.show);
userRouter.post("/", userController.create);
userRouter.put("/:userId", userController.edit);
userRouter.delete("/:userId", userController.remove);