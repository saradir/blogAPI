import { useState } from "react";
import ErrorMessage from "./ErrorMessage";


function CommentForm({onSubmit, error}){
    const [commentText, setCommentText] = useState('');
    function handleChange(e){
    setCommentText(e.target.value)
    }


    return(
        <>
            
            <form className="comment-form" onSubmit={onSubmit}>
                <h4 className="comment-form-title">Write a comment</h4>
                <textarea
                name="text"
                value={commentText}
                onChange={handleChange}
                />

                <button type="submit" disabled={commentText.trim() === ''}>Add comment</button>
            </form>
            {error && <ErrorMessage error={error} />}
        </>
    );
}

export default CommentForm;