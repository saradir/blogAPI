import { error } from 'node:console';
import { prisma } from '../lib/prisma';


export async function index(req, res, next){

   
    try{
        const posts = await prisma.post.findMany({
            where: req.user?.isAdmin? {} : {isDraft: false}, // exclude drafts if not admin
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

export  function show(req, res, next){


    return res.status(200).json({
        success: true,
        post: req.post
    });
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
