import "../styles/CommentControls.css"
function CommentControls({commentId}){
    return(
        <div className="comment-controls">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
}

export default CommentControls