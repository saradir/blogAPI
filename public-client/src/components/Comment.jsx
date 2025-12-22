function Comment({comment}){
    return(
        <li className="comment">
            {comment.text}
        </li>
    );
}

export default Comment;