function Comment({comment}){
    return(
        <li>
            <article className="comment">
                <header className="comment-header">

                    <span>{comment.user.username} wrote:</span>
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
            </article>
        </li>
    );
}

export default Comment;