import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState(null);
    const [commentError, setCommentError] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {signal: controller.signal});
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPost(data.post);
            } catch (err) {
                if(err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        async function fetchComments(){
            try{
                const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {signal:controller.signal});
                if(!response.ok) throw new Error (`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setComments(data.comments);
            } catch (err){
                 if(err.name !== "AbortError") setCommentError(err.message);
            } finally {
                setLoadingComments(false);
            }
        }

        if (postId){ 
            fetchPost();
            fetchComments();
        }


        return () => {
            controller.abort();
        };
    }, [postId]);

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error}</p>;


  function renderComments(){
    if(loadingComments) return <p>Loading comments...</p>;
    else if(commentError) return  <p>Failed to load comments:{commentError}</p>
    else if (!comments || comments.length === 0) return <p>No comments to this post yet</p>
    else return(
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
    );
  }
  return(
     <div>
        <p>{post?.title || "Untitled"}</p>

        
        <div className="commentsContainer">
            {renderComments()}
        </div>
        
    </div>
    );
}

export default PostPage;
