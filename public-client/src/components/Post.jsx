import { Link } from "react-router-dom";

export function Post({post}){
    return(
        <div className="post">
            <Link to={`/posts/${post.id}`}>
                {post.title}
            </Link>


        </div>
    )
}