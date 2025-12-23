function CommentForm({handleSubmit, handleChange, text}){

return(
    <form className="comment-form" onSubmit={handleSubmit}>
        <h4 className="comment-form-title">Write a comment</h4>
        <textarea
        value={text}
        onChange={handleChange}
        />

        <button type="submit" disabled={text.trim() === ''}>Add comment</button>
    </form>
);
}

export default CommentForm;