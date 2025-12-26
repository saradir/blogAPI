import { getAuth } from "../util/authStorage";
import CommentControls from "./CommentControls";
import "../styles/Comment.css";

function Comment({comment, onDelete, onEdit, editMode}){

    const auth = getAuth();
    return(
        <li>
            <article className={`comment ${editMode? 'editing' : ''}`}>
                <header className="comment-header">

                    <span>{!comment.user.id === auth.userId? <i>You</i> : comment.user.username} wrote:</span>
                    <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
                </header>

                <section className="comment-content">
                    {editMode && <p className="editing-note">Editing this comment...</p>}
                {comment.text}
                </section>

                <footer className="comment-footer">
                    {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                    <time>
                        Edited: {new Date(comment.updatedAt).toLocaleDateString()}
                    </time>
                    )}
                    
                </footer>
                
                {(auth.isAdmin || comment.user.id === auth.userId ) && <CommentControls comment={comment} onDelete={onDelete} onEdit={onEdit} />}
                
            </article>
        </li>
    );
}

export default Comment;