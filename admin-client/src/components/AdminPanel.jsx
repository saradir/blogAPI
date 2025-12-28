import { useEffect, useState } from "react";
import { getAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";
import PostTable from "./PostTable";
import ErrorMessage from "./ErrorMessage";
import "../styles/AdminPanel.css"

function AdminPanel(){
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    



    useEffect(() => {

        async function fetchPosts(){
        setError(null);
        setLoading(true);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/admin/posts`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuth().token}`
                },

            }
                
            );
            const data = await response.json();
                if (!response.ok) {
                    setError(data.message || "Failed to load posts"); 
                    return;
                }
                setPosts(data.posts);
        }catch (err) {
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }
        if (!getAuth().isAdmin) {
            navigate("/");
            return;
        }
        fetchPosts();
    }, [navigate]);
    

    if(loading) return <p>Loading page...</p>
    return(
        <div className="admin-panel">
        <ErrorMessage error={error} />
            <div className="header">
                
                <button type="button" onClick={() => navigate("/admin/posts/new")}>New Post</button>
                <button>Show Drafts</button>
            </div>

            <PostTable posts={posts} />

        </div>
    )
}

export default AdminPanel;