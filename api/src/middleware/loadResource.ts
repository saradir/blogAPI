// This module is used to check the URL params of different resources.
// It will return an error if the id is invalid or the resource doesn't exist. Otherwise it will fetch the
// resource from the database and attach it to the request object.

import { prisma } from "../lib/prisma";

export async function loadComment(req, res, next, commentId) {
    const id = Number(commentId);

    if(Number.isNaN(id)){
        return res.status(400).json({error: {message: "Invalid comment id"}})
    }

    try{
        const comment = await prisma.comment.findUnique({
            where: {id}
        });

        if(!comment){
            return res.status(404).json({ error: {message: "Comment not found"}});
        }

        req.comment = comment;

        next();
    } catch (err){
        next(err);
    }
}


export async function loadPost(req, res, next, postId) {
    const id = Number(postId);

    if(Number.isNaN(id)){
        return res.status(400).json({error: {message: "Invalid post id"}})
    }

    try{
        const post = await prisma.post.findUnique({
            where: {id}
        });

        if(!post){
            return res.status(404).json({ error: {message: "Post not found"}});
        }

        req.post = post;

        next();
    } catch (err){
        next(err);
    }
}


export async function loadUser(req, res, next, userId) {
    const id = Number(userId);

    if(Number.isNaN(id)){
        return res.status(400).json({error: {message: "Invalid user id"}})
    }

    try{
        const user = await prisma.user.findUnique({
            where: {id}
        });

        if(!user){
            return res.status(404).json({ error: {message: "user not found"}});
        }

        req.user = user;

        next();
    } catch (err){
        next(err);
    }
}