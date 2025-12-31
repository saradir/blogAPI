import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/PostPage.css";
import PostLayout from "./PostLayout";
import ErrorMessage from "./ErrorMessage";
import PostControls from "./PostControls";
import { getAuth } from "../util/authStorage";


function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(true);

    const [localPost, setLocalPost] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const controller = new AbortController();

        async function fetchPost() {
            
            try {
                const response = await fetch(`${import.meta.env.VITE_API_SERVER}/posts/${postId}`, {
                    signal: controller.signal,
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getAuth().token}`
                    },
                });
                const data = await response.json();
                if (!response.ok){
                    setError(data.message);
                }
                
                setPost(data.post);
                setLocalPost(data.post);
            } catch (err) {
                if(err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (postId){ 
            setLoading(true);
            fetchPost();
            
        }
        if(!postId){
            setLocalPost({text:'', title: '', createdAt: new Date(), updatedAt: '', user: {username: getAuth().username}});
        }


        return () => {
            controller.abort();
        };
    }, [postId]);

    async function handleSave(mode){
        try{
            if(postId){
                if(!postChanged()){
                     setError("No changes to save");
                     return;
                }
            }
            const method = postId? "PUT" : "POST"
            const url = postId? `${import.meta.env.VITE_API_SERVER}/posts/${postId}` : `${import.meta.env.VITE_API_SERVER}/posts`;
            const payload = {title: localPost.title, text:localPost.text, isDraft:  mode === "draft"}
            console.log(payload)
            console.log(url)
            const response = await fetch(url, {
                method,
                headers:{
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${getAuth().token}`
                                },
                body: JSON.stringify(payload)
                            });
            const data = await response.json();
            if(!response.ok){
                 setError(data.message || "Saving failed");
                 return;
            }
            setError(null);
            navigate(`/admin/posts/${data.post.id}/edit`);
        } catch(err){
            setError(err.message);
        }
    }

    // Check if post has been changed
    function postChanged(){
        return localPost.text.trim() !== post.text.trim() || localPost.title.trim() !== post.title.trim();
    }
    function toggleEditMode(){
        setError(null);
        setIsEditing(v => !v);
    }
    function handleChangeTitle(title){
        setError(null);
        setLocalPost(prev => ({ ...prev, title }));
    }

    function handleChangeText(text){
        setError(null);
        setLocalPost(prev => ({ ...prev, text }));
    }


    
  if (loading) return <p>Loading...</p>;
 

  return(
        
        <div className="content">
            {error && <ErrorMessage error={error} />}
            <PostControls
                handleSave={handleSave}
                toggleEditMode={toggleEditMode}
                isEditing={isEditing}
            />

            {localPost && <PostLayout post={localPost} isEditing={isEditing} handleChangeText={handleChangeText} handleChangeTitle={handleChangeTitle} />}
            

        </div>
    );
}

export default PostPage;
