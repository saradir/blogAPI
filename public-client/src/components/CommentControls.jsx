import "../styles/CommentControls.css"
function CommentControls({comment, onDelete, onEdit}){
    return(
        <div className="comment-controls">
            <button onClick={() => onEdit(comment.id, comment.text)}>Edit</button>
            <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
    );
}

export default CommentControls