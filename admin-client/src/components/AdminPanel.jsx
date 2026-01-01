import { useEffect, useState } from "react";
import { getAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";
import PostTable from "./PostTable";
import MessageBox from "./MessageBox";
import "../styles/AdminPanel.css"

function AdminPanel(){
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [showDrafts, setShowDrafts] = useState(false);
    



    useEffect(() => {

        async function fetchPosts(){
        setMessage(null);
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
                    setMessage({text: data.message || "Failed to load posts", type: "error"}); 
                    return;
                }
                setPosts(data.posts);
        }catch (err) {
            setMessage({text: err.message || "Failed to load posts", type: "error"});
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
        <MessageBox message={message} />
            <div className="header">
                
                <button type="button" onClick={() => navigate("/admin/posts/new")}>New Post</button>
                <button type="button" onClick={() => setShowDrafts(v => !v)}>Show Drafts</button>
            </div>

            <PostTable posts={posts} showDrafts={showDrafts} />

        </div>
    )
}

export default AdminPanel;