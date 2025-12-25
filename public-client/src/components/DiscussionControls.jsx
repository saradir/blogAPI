import "../styles/DiscussionControls.css";
export function DiscussionControls({commentCount, showComments, toggleCommentView, toggleCommentForm}){
    
const isLoggedIn = Boolean(localStorage.getItem("token"));

    return(
        <div className="discussion-controls">
            {isLoggedIn
            ? <button onClick={toggleCommentForm}>Write comment</button>
            : "Log in to add a comment"
            }
            <button disabled={commentCount === 0} onClick={toggleCommentView}>{showComments? 'Hide': 'Show'} comments ({commentCount})</button>
        </div>
    );
}

export default DiscussionControls;