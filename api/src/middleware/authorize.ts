import { prisma } from "../lib/prisma"

export const requireOwner = async (req, res, next) => {
    
    if(req.user.isAdmin || (req.user.id === Number(req.params.userId))) return next();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })

}

export const requirePostAccess = (req, res, next) => {
    if(req.post.isDraft && !req.user.isAdmin){
        return res.status(403).json({
            success: false,
            error: {message: "Permission denied"}
        });
    }
    return next();
    
}

export const requireAdmin =  (req, res, next) =>{
    if(req.user.isAdmin) return next ();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })
}

export const requireCommentOwner = (req, res, next) => {
    
    if((req.user.isAdmin) || (req.user.id === req.comment.userId)) return next();


    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    });

}