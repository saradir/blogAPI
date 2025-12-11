import passport from "../config/passport";

export const localLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Authentication failed",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};