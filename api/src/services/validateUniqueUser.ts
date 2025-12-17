import { prisma } from '../lib/prisma';



export async function uniqueUserValidator(email = null, username = null, excludeUserId = null){

    const errors = [];
    const orConditions = [];
    
    

    if(email) orConditions.push({email});
    if(username) orConditions.push({username});
    if(orConditions.length === 0){
        throw new Error("No fields provided");
    }

    const users =  await prisma.user.findMany({
            where: {
                AND: [
                {OR: orConditions},
                excludeUserId? {id: {not: excludeUserId}} : {}
                ]
            },
            
        });

    for( const user of users){   
        if(user.email === email){
            const error = {field: "email", message: "Email taken"}
            errors.push(error);
        }

        if(user.username === username){
            const error = {field: "username", message: "Username taken"}
            errors.push(error);
        }
    }
    return errors;
}