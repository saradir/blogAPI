import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import "../styles/PostPage.css";
import "../styles/CommentForm.css";
import CommentForm from "./CommentForm";

function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [ showForm, setShowForm] = useState(false);
    const [commentText, setCommentText] = useState('');
    const toggleCommentView = () => setShowComments(v => !v);
    const toggleCommentForm = () => setShowForm(v => !v);

    function handleChange(e){
        setCommentText(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(commentText);
    }
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
            <article className="post">
                <header className="post-header">
                    <h2>{post.title}</h2>
                    <span>{post.user.username}</span>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </header>

                <section className="post-content">
                {post.text}
                </section>

                <footer className="post-footer">
                    {post.updatedAt !== post.createdAt && (
                    <time>Updated: {new Date(post.updatedAt).toLocaleDateString()}</time>
                    )}
                    <button onClick={toggleCommentForm}>Write comment</button>
                    <button disabled={post._count.comments === 0} onClick={toggleCommentView}>{showComments? 'Hide': 'Show'} comments ({post._count.comments})</button>
                </footer>
            </article>

            {showForm && <CommentForm handleChange={handleChange} handleSubmit={handleSubmit} text={commentText} />}
            {showComments && <CommentList postId={postId} />}

        </div>
    );
}

export default PostPage;
