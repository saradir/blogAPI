import { useEffect, useState } from "react";
import { getAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";
import ErrorMessage from "./ErrorMessage";

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
                    setError(data.message || "Failed to delete comment"); 
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
        <>
        <ErrorMessage error={error} />
            <div className="header">
                <button>New Post</button>
                <button>Show Drafts</button>
            </div>

            <PostList posts={posts} />

        </>
    )
}

export default AdminPanel;