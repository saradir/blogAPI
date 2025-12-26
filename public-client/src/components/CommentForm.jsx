import ErrorMessage from "./ErrorMessage";


function CommentForm({ onSubmit, error, commentText, onChange, formRef }) {
  return (
    <>
      <form ref={formRef} className="comment-form" onSubmit={onSubmit}>
        <textarea value={commentText} onChange={onChange} />
        <button type="submit" disabled={commentText.trim() === ""}>
          Save
        </button>
      </form>
      {error && <ErrorMessage error={error} />}
    </>
  );
}

export default CommentForm;
