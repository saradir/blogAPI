import Comment from "./Comment";
import "../styles/Comment.css";

function CommentList({comments, onDelete, onEdit}){

    if(!comments || comments.length === 0) return <p>No comments on this post yet</p>   
    return(
        <ol>
            {comments.map((comment) => (

                <Comment key={comment.id} comment={comment} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </ol>
    );
}

export default CommentList;