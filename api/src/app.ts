import express from "express";
import session from "express-session";
import passport from "passport";
import { prisma } from "./lib/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "changeme",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// placeholder
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.get("/", (_req, res) => {
  res.send("Template working");
});



app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to API"
  });
});

app.post('/api/posts', verifytoken, (req, res) => {
  jwt.verify(req.token, "secret", (err, authData) =>{
    if(err){
      res.sendStatus(403);
    } else {
      res.json({
      message: 'Post created',
      authData
    });
    }

  })

});

app.post('/api/login', (req, res) =>{

  const user = {
    id :1,
    username: "Joe"
  }
  jwt.sign({ user}, "secret", (error, token) => {
    res.json({
      token
    });
  });
});


//
function verifytoken (req, res, next){
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(' ')[1];
    req.token = bearer;
    next();
  } else {
    res.json(bearerHeader);
  }
}
app.listen(5000, () => console.log('Server started on 5000'));

export default app;


