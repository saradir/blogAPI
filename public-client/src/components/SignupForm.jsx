import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import "../styles/SignupForm.css"
function SignupForm(){

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function updateForm(e){
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    async function onSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try{
            const response = await  fetch(`${import.meta.env.VITE_API_SERVER}/users`, {
                method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Login failed");
            
            return;
            }
            navigate("/login");
        
            } catch (err) {
                if(err.name !== "AbortError") setError(err.message);
            } finally {
                setSubmitting(false);
            }



    }

    
    return (
        <>

            <ErrorMessage error={error} />

            <form className="signup-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required value={formData.username}  onChange={(e) => (updateForm(e))}></input>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={formData.email}  onChange={(e) => (updateForm(e))}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required value={formData.password} onChange={(e) => (updateForm(e))}></input>

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={(e) => (updateForm(e))}></input>

                <button type="submit" disabled={submitting}>Sign up</button>
            </form>
        </>
    )
}

export default SignupForm;