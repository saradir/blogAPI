import "../styles/Post.css"

function Post({post}){

    const status = post.isDraft? "draft" : "published";
    return(
        <div className="post">

            <span className="post-title">{post.title}</span>
            {post.publishedAt && <span className="publish-date">{new Date(post.publishedAt).toLocaleDateString()}</span>}
            <div className="post-actions">
                <button>Edit</button>
                <button className={`status ${status}`}>{status}</button>
            </div>
        </div>
    )
}

export default Post;