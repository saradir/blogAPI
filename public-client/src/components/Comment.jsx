import { getAuth } from "../util/authStorage";
import CommentControls from "./CommentControls";
function Comment({comment}){

    const auth = getAuth();
    return(
        <li>
            <article className="comment">
                <header className="comment-header">

                    <span>{comment.user.id === auth.userId? <i>You</i> : comment.user.username} wrote:</span>
                    <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
                </header>

                <section className="comment-content">
                {comment.text}
                </section>

                <footer className="comment-footer">
                    {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                    <time>
                        Updated: {new Date(comment.updatedAt).toLocaleDateString()}
                    </time>
                    )}
                    
                </footer>

                <CommentControls />
            </article>
        </li>
    );
}

export default Comment;