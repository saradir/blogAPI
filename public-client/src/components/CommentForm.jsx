import { useState } from "react";


function CommentForm(){
    const [commentText, setCommentText] = useState('');
    function handleChange(e){
    setCommentText(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(commentText);
    }
    return(
        <form className="comment-form" onSubmit={handleSubmit}>
            <h4 className="comment-form-title">Write a comment</h4>
            <textarea
            value={commentText}
            onChange={handleChange}
            />

            <button type="submit" disabled={commentText.trim() === ''}>Add comment</button>
        </form>
    );
}

export default CommentForm;