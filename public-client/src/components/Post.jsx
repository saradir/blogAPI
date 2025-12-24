
import { useState } from "react";

import CommentList from "./CommentList";
import PostLayout from "./PostLayout";
import DiscussionControls from "./DiscussionControls";
import CommentForm from "./CommentForm";


export function Post({post}){
    const [showComments, setShowComments] = useState(false);
    const [ showForm, setShowForm] = useState(false);
    const toggleCommentView = () => setShowComments(v => !v);
    const toggleCommentForm = () => setShowForm(v => !v);


    return(
        <div className="post">
            <PostLayout post={post}>               
                <DiscussionControls commentCount={post._count.comments} toggleCommentView={toggleCommentView} toggleCommentForm={toggleCommentForm} showComments={showComments} />
            </PostLayout>

            {showForm && <CommentForm   />}
            {showComments && <CommentList postId={post.id} />}

            


        </div>
    );
}