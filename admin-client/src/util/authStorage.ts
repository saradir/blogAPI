// Provides several methods to store, access and reset auth data

export function setAuth(token, user){
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("isAdmin", user.isAdmin);
}

export function getAuth(){

    const userId = Number(localStorage.getItem("userId"));
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const username = localStorage.getItem("username");
    return(
        {
            token: localStorage.getItem("token"),
            userId,
            isAdmin,
            username
            }
    );
}

export function clearAuth(){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");

}