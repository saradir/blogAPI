import express from "express";
import * as postController from "../controllers/postController";
import { commentRouter } from "./commentRouter";
export const postRouter = express.Router();
import { jwtAuth } from "../middleware/jwtAuth";
import * as authorize from "../middleware/authorize"


postRouter.get("/", postController.index);
postRouter.get("/:postId", postController.show );
postRouter.post("/", jwtAuth, authorize.requireAdmin, postController.create);
postRouter.put("/:postId",jwtAuth, authorize.requireAdmin, postController.edit);
postRouter.delete("/:postId", jwtAuth, authorize.requireAdmin, postController.remove);
postRouter.use("/:postId/comments", commentRouter);
