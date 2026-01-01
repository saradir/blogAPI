import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/PostPage.css";
import PostLayout from "./PostLayout";
import MessageBox from "./MessageBox";
import PostControls from "./PostControls";
import { getAuth } from "../util/authStorage";


function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState(null); // message: {text: string, type:error | warning | success}
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(true);

    const [localPost, setLocalPost] = useState(null);




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
                    setMessage({text: data.message, type: "error"});
                    return;
                }
                
                setPost(data.post);
                setLocalPost(data.post);
            } catch (err) {
                if(err.name !== "AbortError") setMessage({text: err.message, type:"error"});
            } finally {
                setLoading(false);
            }
        }

        if (postId){ 
            setLoading(true);
            fetchPost();
            
        }
        if(!postId){
            setLocalPost({text:'', title: '', createdAt: new Date(), updatedAt: '', user: {username: getAuth().username}, isDraft: true});
        }


        return () => {
            controller.abort();
        };
    }, [postId]);

    async function handleSave(mode){
        try{
            if(postId){
                if(!postChanged()){
                     setMessage({text:"No changes to save", type: "warning"});
                     return;
                }
            }
            const method = postId? "PUT" : "POST"
            const url = postId? `${import.meta.env.VITE_API_SERVER}/posts/${postId}` : `${import.meta.env.VITE_API_SERVER}/posts`;
            const payload = {title: localPost.title, text:localPost.text, isDraft:  mode === "draft"}
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
                 setMessage({text:data.message || "Saving failed", type: "error"});
                 return;
            }
            if(mode === "draft"){
              setMessage({text: "Draft saved", type: "success"});
              setLocalPost(prev => ({...prev, isDraft: true }));
            }else{ 
                setMessage({text:"Post published", type:"success"});
                setLocalPost(prev => ({...prev, isDraft: false }));
            }
            setPost(localPost);
        } catch(err){
            setMessage({text: err.message, type: "error"});
        }
    }

    // Check if post has been changed
    function postChanged(){
        return localPost.text.trim() !== post.text.trim() || localPost.title.trim() !== post.title.trim();
    }
    function toggleEditMode(){
        setMessage(null);
        setIsEditing(v => !v);
    }
    function handleChangeTitle(title){
        setMessage(null);
        setLocalPost(prev => ({ ...prev, title }));
    }

    function handleChangeText(text){
        setMessage(null);
        setLocalPost(prev => ({ ...prev, text }));
    }


    
  if (loading) return <p>Loading...</p>;
 

  return(
        
        <div className="content">
            {message && <MessageBox message={message} />}
            {localPost && <PostControls
                handleSave={handleSave}
                toggleEditMode={toggleEditMode}
                isEditing={isEditing}
                isDraft={localPost.isDraft}
            />}

            {localPost && <PostLayout post={localPost} isEditing={isEditing} handleChangeText={handleChangeText} handleChangeTitle={handleChangeTitle} />}
            

        </div>
    );
}

export default PostPage;
 