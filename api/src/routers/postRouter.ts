import express from "express";
import * as postController from "../controllers/postController";
import { commentRouter } from "./commentRouter";
export const postRouter = express.Router();
import { jwtAuth } from "../middleware/jwtAuth";

postRouter.get("/", postController.index);
postRouter.get("/:postId", postController.show );
postRouter.post("/", jwtAuth, postController.create);
postRouter.put("/:postId", postController.edit);
postRouter.delete("/:postId", postController.remove);
postRouter.use("/:postId/comments", commentRouter);
