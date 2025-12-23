import { useState, useEffect } from "react";
import Comment from "./Comment";

function CommentList({postId}){
        const [comments, setComments] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const controller = new AbortController();
            setLoading(true);
            setError(null);

            async function fetchComments(){
            try{
                const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {signal:controller.signal});
                if(!response.ok) throw new Error (`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setComments(data.comments);
            } catch (err){
                 if(err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if(postId) fetchComments();
         return () => {
            controller.abort();
        };

        }, [postId]);


        if(loading) return <p>Loading comments...</p>
        if(error) return <p>Error loading comments: {error}</p>
        if(comments && comments.length === 0) return <p>No comments on this post yet</p>

        
        return(
            <ul>
                {comments?.map((comment => (

                    <Comment key={comment.id} comment={comment} />
                )))}
            </ul>
        );
}

export default CommentList;