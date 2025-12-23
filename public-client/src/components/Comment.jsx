function Comment({comment}){
    return(
        <li className="comment">
            {comment.user.username}
            {comment.text}
        </li>
    );
}

export default Comment;