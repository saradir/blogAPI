import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/PostPage.css";
import PostLayout from "./PostLayout";
import ErrorMessage from "./ErrorMessage";
import PostControls from "./PostControls";



function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(true);

    function handleSave(){
        return
    }

    function handleSaveDraft(){
        return
    }

    function toggleEditMode(){
        setIsEditing(v => !v);
    }


    useEffect(() => {
        const controller = new AbortController();

        async function fetchPost() {
            
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER}/posts/${postId}`, {signal: controller.signal});
                const data = await response.json();
                if (!response.ok){
                    setError(data.message);
                }
                setPost(data.post);
            } catch (err) {
                if(err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (postId){ 
            fetchPost();
        }


        return () => {
            controller.abort();
        };
    }, [postId]);

  if (loading || !post) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return(
        
        <div className="content">
            {error && <ErrorMessage error={error} />}
            <PostControls
                handleSave={handleSave}
                handleSaveDraft={handleSaveDraft}
                toggleEditMode={toggleEditMode}
                isEditing={isEditing}
            />

            {post && <PostLayout post={post} isEditing={isEditing} />}
            

        </div>
    );
}

export default PostPage;
