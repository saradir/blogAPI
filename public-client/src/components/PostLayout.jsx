function PostLayout({post, children}){
    return(
        <article className="post">
            <header className="post-header">
                <h2>{post.title}</h2>
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