import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "../util/authStorage";
import MessageBox from "./MessageBox";
import "../styles/LoginForm.css"
function LoginForm(){

    const navigate = useNavigate();
    const [message, setmessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() =>{
        // check if user is already connected
        if(getAuth().isAdmin) navigate("/admin");
    });

    async function onSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        setmessage(null);
        try{
            const response = await  fetch(`${import.meta.env.VITE_API_SERVER}/login`, {
                method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email" : e.target.username.value,
                    "password": e.target.password.value              
                })
            });

            const data = await response.json();
            if (!response.ok || !data.user.isAdmin) {
                setmessage(data.message || "Login failed");
            
            return;
            }
            setAuth(data.token, data.user);
            console.log(getAuth());
            navigate("/admin");
        
            } catch (err) {
                if(err.name !== "Abortmessage") setmessage(err.message);
            } finally {
                setSubmitting(false);
            }



    }
    if(submitting) return <p>Logging in...</p>

    
    return (
        <>

            <MessageBox message={message} />

            <form className="login-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"></input>

                <button type="submit" >Log in</button>
            </form>
        </>
    )
}

export default LoginForm;