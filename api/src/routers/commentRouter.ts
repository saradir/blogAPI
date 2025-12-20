import express from "express";
import * as commentController  from "../controllers/commentController";
import { jwtAuth } from "../middleware/jwtAuth";
import * as authorize from "../middleware/authorize"
import { loadComment } from "../middleware/loadResource";
export const commentRouter = express.Router({ mergeParams: true});

commentRouter.param('commentId', loadComment);
commentRouter.get("/", commentController.index);
commentRouter.get("/:commentId", commentController.show);
commentRouter.post("/",jwtAuth, commentController.create);
commentRouter.put("/:commentId",jwtAuth, authorize.canModifyComment, commentController.edit);
commentRouter.delete("/:commentId",jwtAuth, authorize.canModifyComment, commentController.remove);