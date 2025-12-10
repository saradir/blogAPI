import express from "express";
import * as commentController  from "../controllers/commentController";

export const commentRouter = express.Router({ mergeParams: true});

commentRouter.get("/", commentController.index);
commentRouter.get("/:commentId", commentController.show);
commentRouter.post("/", commentController.create);
commentRouter.put("/:commentId", commentController.edit);
commentRouter.delete("/:commentId", commentController.remove);