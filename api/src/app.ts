import express from "express";
import cors from "cors";
import passport from "./config/passport";
import jwt from "jsonwebtoken";
import { userRouter } from "./routers/userRouter";
import { postRouter } from "./routers/postRouter";
import { commentRouter } from "./routers/commentRouter";
import { localLogin } from "./middleware/localLogin";
import { errorHandler } from "./middleware/errorMiddleware";
import { corsOptions } from "./config/corsOptions";
import { sanitizeUser } from "./services/sanitizeUser";
import { adminRouter } from "./routers/adminRouter";

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use(passport.initialize());


app.get("/", (_req, res) => {
  res.send("Template working");
});

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);


app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to API"
  });
});


app.post('/api/login', localLogin, (req, res) => {
  const payload = {
    id: req.user.id,
    email: req.user.email
  };
  const user = sanitizeUser(req.user);
  jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
    return res.status(200).json({
      success: true,
      token,
      user
    });
  });
});

app.use(errorHandler);

app.listen(3000, () => console.log('Server started on 3000'));

export default app;


