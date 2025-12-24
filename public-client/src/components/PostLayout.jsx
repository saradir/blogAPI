import { Link} from "react-router-dom";

function PostLayout({post, children}){
    return(
        <article className="post">
            <header className="post-header">
                <Link to={`/posts/${post.id}`}>
                    <h2>{post.title}</h2>
                </Link>
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

            {children}    

            </footer>
        </article>
    )
}

export default PostLayout;