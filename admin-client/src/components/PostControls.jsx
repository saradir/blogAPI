import "../styles/PostControls.css"

function PostControls({toggleEditMode, isEditing, handleSave, isDraft}){

    const saveBtnTxt = isDraft? "Save & Publish" : "Save Changes";

    return(
        <div className="post-controls">
            <div className="save-buttons">
                <button type="button" className="save-post-btn" onClick={() => handleSave("publish")}>{saveBtnTxt}</button>
                <button type="button" className="save-draft-btn" disabled={!isDraft} onClick={() => handleSave("draft")}>Save as Draft</button>
            </div>

            <div>
                <button className="preview-btn"  onClick={toggleEditMode}>{isEditing? "Preview" : "Edit"}</button>
            </div>

            
        </div>
    );
}
export default PostControls