import "../styles/CommentControls.css"
function CommentControls({commentId, onDelete}){
    return(
        <div className="comment-controls">
            <button>Edit</button>
            <button onClick={() => onDelete(commentId)}>Delete</button>
        </div>
    );
}

export default CommentControls