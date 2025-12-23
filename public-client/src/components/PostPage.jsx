import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import "../styles/PostPage.css";
import "../styles/CommentForm.css";
import CommentForm from "./CommentForm";
import { DiscussionControls } from "./DiscussionControls";
import PostLayout from "./PostLayout";

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
            <PostLayout post={post}>

                
                <DiscussionControls commentCount={post._count.comments} toggleCommentView={toggleCommentView} toggleCommentForm={toggleCommentForm} showComments={showComments} />

            </PostLayout>

            {showForm && <CommentForm handleChange={handleChange} handleSubmit={handleSubmit} text={commentText} />}
            {showComments && <CommentList postId={postId} />}

        </div>
    );
}

export default PostPage;
