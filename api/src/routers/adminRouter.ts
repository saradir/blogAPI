import express from "express";
import * as postController from "../controllers/postController";
export const adminRouter = express.Router();
import { jwtAuth } from "../middleware/jwtAuth";
import * as authorize from "../middleware/authorize"

adminRouter.get("/posts", jwtAuth, authorize.requireAdmin,
     (req, res, next) => {
    res.locals.includeDrafts = true;
    postController.index(req, res, next);
     }
);