import Post from "./Post";
import "../styles/PostList.css"

function PostList({posts}) {
    return(
    <ul className="post-list">
      {posts.map( post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
    )
}

export default PostList;