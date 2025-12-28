import "../styles/PostControls.css"

function PostControls({toggleEditMode, isEditing, handleSave, handleSaveDraft}){
    return(
        <div className="post-controls">
            <div className="save-buttons">
                <button type="button" className="save-post-btn" onClick={handleSave}>Save</button>
                <button type="button" className="save-draft-btn" onClick={handleSaveDraft}>Save Draft</button>
            </div>

            <div>
                <button className="preview-btn"  onClick={toggleEditMode}>{isEditing? "Preview" : "Edit"}</button>
            </div>

            
        </div>
    );
}
export default PostControls