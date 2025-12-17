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
        res.status(200).json({
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

export async function remove(req, res, next){
    try{
        await prisma.user.delete({
            where: {
                id: Number(req.params.userId)
            }
        })
    
        return res.status(200).json({
            success: true
        })
        
    } catch (err) {
        next(err);
    }
}

export async function edit(req, res, next){

    const requiresConfirmPassword = (req.body.password || req.body.email) && !req.user.isAdmin;
    const requiresConfirmUniqueness = req.body.email || req.body.username;

    try{

        if (requiresConfirmPassword){
            if(!req.body.currentPassword){
                return res.status(400).json({
                    success: false,
                    errors: [{
                        code: "MISSING_PASSWORD",
                        message: "Must include current password"}]
                })
            }
            const confirmed =  await bcrypt.compare(req.body.currentPassword, req.user.password);
            if(!confirmed){
                    return res.status(403).json({
                    success: false,
                    errors: [{message: "Wrong password"}]
                })
            }
            }
        

        if(requiresConfirmUniqueness){
            const errors = await uniqueUserValidator(req.body.email, req.body.username, req.user.id)
            if(errors.length > 0){
                    return res.status(409).json({
                    success: false,
                    errors
                })
            }
        }
        
        const updateData: any = {};

        if(req.body.password){
            updateData.password = await bcrypt.hash(req.body.password, 10);
            
        }

        if(req.body.email){
            //confirm password or exit
            //confirm uniquness or exit
            updateData.email = req.body.email;
        }

        if(req.body.username){
            //confirm uniquness or exit
            updateData.username = req.body.username;
        }

        if(Object.keys(updateData).length === 0){
            return res.status(400).json({
                success: false,
                code: "MISSING_DATA"
            })
        }

        
            
        await prisma.user.update({
            where: {id: Number(req.params.userId)},
            data: updateData
        })
        return res.status(200).json({
            success: true
        })    
    } catch (err){
        next(err);
    }
}