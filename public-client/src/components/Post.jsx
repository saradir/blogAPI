
import { useState, useRef, useEffect } from "react";

import CommentList from "./CommentList";
import PostLayout from "./PostLayout";
import DiscussionControls from "./DiscussionControls";
import CommentForm from "./CommentForm";
import ErrorMessage from "./ErrorMessage";
import { getAuth } from "../util/authStorage";


export function Post({post}){
    const [showComments, setShowComments] = useState(false);
    const [ showForm, setShowForm] = useState(false);
    const toggleCommentForm = () => setShowForm(v => !v);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState('');
    const formRef = useRef(null);
    const commentCount = comments !== null ? comments.length : post._count.comments;


    useEffect(() => {
        if (!isEditing) return;

        function handleClickOutside(e) {
            if (e.button === 2) return;

            if (formRef.current && !formRef.current.contains(e.target)) {
            setIsEditing(false);
            setShowForm(false);
            setCommentText("");
            setEditingCommentId("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);


    // Handles text change in comment form
    function handleCommentChange(e){
        setCommentText(e.target.value);
    }


    async function fetchComments(){
            setLoading(true);
            setError(null);
            try{
                const response = await fetch(`${import.meta.env.VITE_API_SERVER}/posts/${post.id}/comments`);
                const data = await response.json();
                if (!response.ok) {
                    setError(data.error || "Failed to load comments");
                    return;
                }
                setComments(data.comments);
            } catch (err){
                    if(err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

    async function toggleCommentView(){
        if (!showComments && comments === null) {
            await fetchComments();
        }
        setShowComments(v => !v);

    }

    async function handleSubmitComment(e){
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        const token = getAuth().token;
        const url = isEditing
        ? `${import.meta.env.VITE_API_SERVER}/posts/${post.id}/comments/${editingCommentId}`
        : `${import.meta.env.VITE_API_SERVER}/posts/${post.id}/comments`

        if (!token) {
            setSubmitError("You must be logged in to comment");
            setSubmitting(false);
            return;
        }
        try{
            const response = await fetch(url, {
                method: isEditing? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "text" : commentText            
                })
            });
            
            const data = await response.json();
            if (!response.ok) {
                setSubmitError(data.message || "Posting comment failed");            
            return;
            }
            fetchComments(); // re-fetch comments
            e.target.reset();
            setShowForm(false);
            setShowComments(true);

        
        }catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
            setCommentText('');
            setIsEditing(false);
            setEditingCommentId('');
        }

    }

    async function handleDeleteComment(commentId){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_SERVER}/posts/${post.id}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuth().token}`
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Failed to delete comment"); 
                return;
            }
            fetchComments();
        }catch (err) {
            setError(err.message);
        }
    }

    async function handleEditComment(commentId, commentText){
        setIsEditing(true);
        setCommentText(commentText);
        setShowForm(true);
        setEditingCommentId(commentId);
    }

    return(
        <div className="post">
            <PostLayout post={post}>               
                <DiscussionControls commentCount={commentCount} toggleCommentView={toggleCommentView} toggleCommentForm={toggleCommentForm} showComments={showComments} />
            </PostLayout>
            {submitting && <p>Submitting comment...</p>}
            {showForm && <CommentForm
                onSubmit={handleSubmitComment}
                error={submitError}
                commentText={commentText}
                onChange={handleCommentChange}
                isEditing={isEditing}
                formRef={formRef}
                />
            }
            {loading && <p>Loading comments...</p> }
            {error && <ErrorMessage error={error}/>}

            {showComments && <CommentList comments={comments} onDelete={handleDeleteComment} onEdit={handleEditComment} editingCommentId={editingCommentId}/>}
               
        </div>
    );
}