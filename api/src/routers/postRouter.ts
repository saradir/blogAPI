import express from "express";
import * as postController from "../controllers/postController";
import { commentRouter } from "./commentRouter";

export const postRouter = express.Router();

postRouter.get("/", postController.index);
postRouter.get("/:postId", postController.show );
postRouter.post("/", postController.create);
postRouter.put("/:postId", postController.edit);
postRouter.delete("/:postId", postController.remove);
postRouter.use("/:postId/comments", commentRouter);
