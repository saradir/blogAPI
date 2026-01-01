import PostRow from "./PostRow";
import "../styles/PostTable.css"

function PostTable({posts, showDrafts}) {

    if(showDrafts){
      posts = posts.filter(post => post.isDraft);
    }
    return(
      <table className="post-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Created</th>
            <th>Published</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>

    );
}

export default PostTable;
