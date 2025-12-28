import "../styles/Post.css"

 function Post({post}){

    const status = post.isDraft? "draft" : "published";
    return(
    <tr>
    <td>{post.id}</td>
    <td>{post.title}</td>
    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
    <td>
    {post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString()
        : "—"}
    </td>

    <td>
        <button className={`status ${status}`}>{status}</button>
    </td>
    <td>
        <button>Edit</button>
    </td>

</tr>
    )
}

export default Post;

