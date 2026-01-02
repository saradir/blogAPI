import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, setAuth } from "../util/authStorage";
import ErrorMessage from "./ErrorMessage";
import "../styles/LoginForm.css"
function LoginForm(){

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function onSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try{
            const response = await  fetch(`${import.meta.env.VITE_API_SERVER}/api/login`, {
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
            if (!response.ok) {
                setError(data.message || "Login failed");
            
            return;
            }
            setAuth(data.token, data.user);
            console.log(getAuth());
            navigate("/");
        
            } catch (err) {
                if(err.name !== "AbortError") setError(err.message);
                console.log(error);
            } finally {
                setSubmitting(false);
            }



    }
    if(submitting) return <p>Logging in...</p>
    
    return (
        <>

            <ErrorMessage error={error} />

            <form className="login-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required></input>

                <button type="submit" >Log in</button>
            </form>
        </>
    )
}

export default LoginForm;