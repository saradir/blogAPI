import { prisma } from '../lib/prisma';



export async function uniqueUserValidator(email, username){

    const errors = [];

    const users =  await prisma.user.findMany({
            where: {
                OR: [
                    {email},
                    {username}
                ]
            }
        });

    for( const user of users){   
        if(user.email === email){
            const error = {field: "email", msg: "Email taken"}
            errors.push(error);
        }

        if(user.username === username){
            const error = {field: "username", msg: "Username taken"}
            errors.push(error);
        }
    }
    return errors;
}