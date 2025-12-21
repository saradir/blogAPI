import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (!cancelled) setPost(data.post);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        if (postId) fetchPost();

        return () => {
            cancelled = true;
        };
    }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{post?.title || "Untitled"}</p>;
}

export default PostPage;
