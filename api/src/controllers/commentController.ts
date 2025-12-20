import { prisma } from '../lib/prisma';


export async function index(req, res, next){
    try{
        const comments = await prisma.comment.findMany({
            where: {postId: Number(req.params.postId)},
            orderBy: {createdAt: 'desc'},
            include: {user: {
                        select: {
                            id: true, username: true
                        }
                    }}});

        return res.status(200).json({
            success: true,
            comments
        });    
        } catch(err){
            next(err);
        }
}

export async function show(req, res, next){

    return res.status(200).json({
        success: true,
        comment: req.comment
    })
}

export async function create(req, res, next){
    try{
        const comment = await prisma.comment.create({
            data: {
                text: req.body.text,
                userId: req.user.id,
                postId: req.post.id
            }
        });
        return res.status(201).json({
            success: true,
            comment
        });

    } catch(err){
        next(err);
    }
}
export async function edit(req, res, next){
        
    try{
        const comment = await prisma.comment.update({
            where: {id: req.comment.id},
            data: {text: req.body.text}
        });

        return res.status(200).json({
            success: true,
            comment
        });
    } catch (err){
        next(err);
    }

}
export async function remove(req, res, next){
    try{
        await prisma.comment.delete({
            where: {id: req.comment.id}
        });
        return res.status(200).json({
            success:true,
        });
    } catch(err){
        next(err);
    }
}
