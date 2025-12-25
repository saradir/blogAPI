import "../styles/DiscussionControls.css";
import { Link} from "react-router-dom";

export function DiscussionControls({commentCount, showComments, toggleCommentView, toggleCommentForm}){
    
const isLoggedIn = Boolean(localStorage.getItem("token"));

    return(
        <div className="discussion-controls">
            {isLoggedIn
            ? <button onClick={toggleCommentForm}>Write comment</button>
            : <span><Link to="/login">Log in</Link> to add a comment</span>
            }
            <button disabled={commentCount === 0} onClick={toggleCommentView}>{showComments? 'Hide': 'Show'} comments ({commentCount})</button>
        </div>
    );
}

export default DiscussionControls;