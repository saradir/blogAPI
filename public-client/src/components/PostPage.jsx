import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const toggleCommentView = () => setShowComments(v => !v);


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



  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error}</p>;

  return(

        <div className="content">
            <article className="post">
                <header className="post-header">
                    <h2>{post.title}</h2>
                    <span>{post.author}</span>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </header>

                <section className="post-content">
                {post.text}
                </section>

                <footer className="post-footer">
                    {post.updatedAt !== post.createdAt && <time>Updated: {post.updatedAt}</time>}
                    <button onClick={toggleCommentView}>Show comments</button>
                </footer>
            </article>

            {showComments && <CommentList postId={postId} />}

        </div>
    );
}

export default PostPage;
