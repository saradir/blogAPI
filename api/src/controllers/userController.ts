import { prisma } from '../lib/prisma';
import  bcrypt from "bcryptjs";
import { uniqueUserValidator } from '../services/validateUniqueUser';
import { sanitizeUser } from '../services/sanitizeUser';



export async function create(req, res){
    console.log("BODY:", req.body);
    try{

    // Check if username or email are already in use
        const errors = await uniqueUserValidator(req.body.email, req.body.username);

        if(errors.length > 0){
            return res.status(400).json({
                success: false,
                errors
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await prisma.user.create({
            data:{
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,

            }       
        });
        res.json({
            success: true,
        })
        } catch (err){

            console.error(err);    
            res.sendStatus(400);
            }
}

export async function show(req, res){
    const user = await prisma.user.findUnique({
        where: {id: Number(req.params.userId)}
    });


    if(!user){
        return res.status(404).json({
            success: false,
            errors: [{msg:"User not found"}]
        });
    }

    const safeUser = sanitizeUser(user);
    return res.json({
        success: true,
        user: safeUser
    });
}

export async function index(req, res){
    try{
    const users = await prisma.user.findMany();

    const safeUsers = users.map( user => sanitizeUser(user));
    return res.json({
        success: true,
        safeUsers
    });
    } catch (err){
        return res.status(400).json({
            success: false,
            errors: err
        });
    }
}

export async function remove(req, res){
    return
}

export async function edit(req, res){
    return;
}