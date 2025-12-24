import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "./Post";
import "../styles/PostPage.css";
import "../styles/CommentForm.css";


function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


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
            <Post post={post} />

        </div>
    );
}

export default PostPage;
