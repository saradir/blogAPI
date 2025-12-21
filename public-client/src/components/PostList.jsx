import { Post } from "./Post";
function PostList({posts}) {
    return(
    <ul>
      {posts.map( post => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
    )
}

export default PostList;