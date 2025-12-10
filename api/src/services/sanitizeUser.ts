
// Takes a user object and removes the password property
export function sanitizeUser(user){
    const {password, ...safeUser} = user;
    return safeUser;
}