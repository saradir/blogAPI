import "../styles/DiscussionControls.css";
export function DiscussionControls({commentCount, showComments, toggleCommentView, toggleCommentForm}){
    return(
        <div className="discussion-controls">
            <button onClick={toggleCommentForm}>Write comment</button>
            <button disabled={commentCount === 0} onClick={toggleCommentView}>{showComments? 'Hide': 'Show'} comments ({commentCount})</button>
        </div>
    );
}

export default DiscussionControls;