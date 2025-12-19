import { error } from 'node:console';
import { prisma } from '../lib/prisma';


export async function index(req, res, next){
    try{
        const posts = await prisma.post.findMany({
            orderBy: {createdAt: 'desc'},
            include: {user: {
                        select: {
                            id: true, username: true
                        }
                    }}
            });
        return res.json({
            success: true,
            posts
        });
    } catch (err){
        next(err);
    }
}

export async function show(req, res, next){
    try{
        const post = await prisma.post.findUnique({
        where: {id: Number(req.params.postId)},
        include: {user: {
            select: { id: true, username: true}
        }}
    });

        if(!post){
            return res.status(404).json({
                success: false,
                error: {code: "MISSING_POST", message: "Couldn't find post"}
            });
        }

        return res.status(200).json({
            success: true,
            post
        });
    } catch(err){
        next(err);
    }
}

export async function create(req, res, next){
    try{
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                text: req.body.text,
                userId: req.user.id,
                isDraft: req.body.isDraft
                }
        });

        return res.status(201).json({
            success: true,
            post
        });
    } catch(err){
        next(err);
    }
}
export async function edit(req, res, next){

    const updateData: any = {};

    if('title' in req.body) updateData.title = req.body.title;
    if('text' in req.body) updateData.text = req.body.text;
    if('isDraft' in req.body) updateData.isDraft = req.body.isDraft;


    try{
        const post = await prisma.post.update({
            where: {id: Number(req.params.postId)},
            data: updateData
        });
        return res.status(200).json({
            success: true,
            post
        });
    } catch (err){
        next(err);
    }
    
}
export async function remove(req, res, next){
    try{
        await prisma.post.delete({
            where: {id: Number(req.params.postId)}
        })

        return res.status(200).json({
            success: true
        });
    } catch (err){
        next(err)
    }
}
