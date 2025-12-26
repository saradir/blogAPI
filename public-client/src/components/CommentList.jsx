import Comment from "./Comment";
import "../styles/Comment.css";

function CommentList({comments}){

    if(!comments || comments.length === 0) return <p>No comments on this post yet</p>   
    return(
        <ol>
            {comments.map((comment) => (

                <Comment key={comment.id} comment={comment}  />
            ))}
        </ol>
    );
}

export default CommentList;