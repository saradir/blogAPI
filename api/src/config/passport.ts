import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";



// -----------------------------------
// LocalStrategy
// -----------------------------------

passport.use(
  new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
     
    async (email, password, done) => {
      console.log("EMAIL:", email);
      console.log("PASSWORD:", password);
      try {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // 2. Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password." });
        }

        // 3. Success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


// -----------------------------------
// JwtStrategy
// -----------------------------------
const opts: any ={}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id }
        });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err,false);
    }

    }
));


export default passport;
