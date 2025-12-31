import passport from "../config/passport";
export const requireOwner = async (req, res, next) => {
    
    if(req.user.isAdmin || (req.user.id === Number(req.params.userId))) return next();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })

}

export const requirePostAccess = (req, res, next) => {
    if(!req.post.isDraft)  return next ();
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
}

export const requireAdmin =  (req, res, next) =>{
    if(req.user.isAdmin) return next ();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })
}

export const canModifyComment = (req, res, next) => {
    if(req.user.isAdmin)  return next();

    if(req.user.id !== req.comment.userId){
        return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    });
    }

    // Sets a 24h time window for users to edit their comments
    const EDIT_WINDOW = 24 * 60 * 60 * 1000 // 24h in ms
    const now = Date.now();
    const createdAt = req.comment.createdAt.getTime();
    const elapsedTime = now - createdAt;

    if(elapsedTime >= EDIT_WINDOW){
        return res.status(403).json({
        success: false,
        message: "Edit window expired"
    });
    }

    return next();

}