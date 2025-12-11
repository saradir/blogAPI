import express from "express";
import passport from "./config/passport"
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import { userRouter } from "./routers/userRouter";
import { postRouter } from "./routers/postRouter";
import { localLogin } from "./middleware/localLogin";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use(passport.initialize());


app.get("/", (_req, res) => {
  res.send("Template working");
});


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


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
  jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
    res.json({
      success: true,
      token
    });
  });
});


app.listen(3000, () => console.log('Server started on 3000'));

export default app;


