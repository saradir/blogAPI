import { prisma } from "../lib/prisma"

export const requireOwner = async (req, res, next) => {
    
    if(req.user.isAdmin || (req.user.id === Number(req.params.userId))) return next();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })

}

export const requireAdmin = async (req, res, next) =>{
    if(req.user.isAdmin) return next ();

    return res.status(403).json({
        success: false,
        message: "Unauthorized request"
    })
}