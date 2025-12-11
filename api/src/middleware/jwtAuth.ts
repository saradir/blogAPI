import passport from "../config/passport";

export const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Invalid or missing token"
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};