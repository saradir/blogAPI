import express from "express";
import * as commentController  from "../controllers/commentController";
import { jwtAuth } from "../middleware/jwtAuth";
import * as authorize from "../middleware/authorize"
export const commentRouter = express.Router({ mergeParams: true});

commentRouter.get("/", commentController.index);
commentRouter.get("/:commentId", commentController.show);
commentRouter.post("/",jwtAuth, commentController.create);
commentRouter.put("/:commentId",jwtAuth, authorize.requireCommentOwner, commentController.edit);
commentRouter.delete("/:commentId",jwtAuth, authorize.requireCommentOwner, commentController.remove);