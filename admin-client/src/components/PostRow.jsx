import "../styles/PostRow.css"
import { useNavigate } from "react-router-dom";

 function PostRow({post}){
    const navigate = useNavigate();
    const status = post.isDraft? "draft" : "published";
    
 

    function handleRowClick() {
        navigate(`/admin/posts/${post.id}/edit`);

    }
    return(
        
        <tr className="post-row" onClick={handleRowClick}>
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
    );
}

export default PostRow;

