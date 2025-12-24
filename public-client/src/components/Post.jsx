
import { useState } from "react";

import CommentList from "./CommentList";
import PostLayout from "./PostLayout";
import DiscussionControls from "./DiscussionControls";
import CommentForm from "./CommentForm";


export function Post({post}){
    const [showComments, setShowComments] = useState(false);
    const [ showForm, setShowForm] = useState(false);
    const [commentText, setCommentText] = useState('');
    const toggleCommentView = () => setShowComments(v => !v);
    const toggleCommentForm = () => setShowForm(v => !v);


    function handleChange(e){
        setCommentText(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(commentText);
    }
    console.log(post);
    return(
        <div className="post">
            <PostLayout post={post}>               
                <DiscussionControls commentCount={post._count.comments} toggleCommentView={toggleCommentView} toggleCommentForm={toggleCommentForm} showComments={showComments} />
            </PostLayout>

            {showForm && <CommentForm handleChange={handleChange} handleSubmit={handleSubmit} text={commentText} />}
            {showComments && <CommentList postId={post.id} />}

            


        </div>
    );
}