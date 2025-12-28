import { useState, useEffect } from "react";
import { Link} from "react-router-dom";

import "../styles/PostLayout.css";

function PostLayout({post, isEditing, children}){

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");


    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setText(post.text);
        }
        }, [post]);

        if(post && !isEditing){
            return(
                <article className="post">
                    <header className="post-header">
                        <Link to={`/posts/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <span>{post.user.username}</span>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </header>

                    <section className="post-content">
                    {post.text}
                    </section>

                    <footer className="post-footer">
                        {post.updatedAt !== post.createdAt && (
                        <time>Updated: {new Date(post.updatedAt).toLocaleDateString()}</time>
                        )}

                    {children}    

                    </footer>
            </article>
            );
        }

        if(isEditing){
            return(
                <form className="post form">
                    <header className="post-header">
                

                        <h2 className="post-title">
                            <label htmlFor="title">Title: </label>
                            <input id="title" name="title" type="text" value={title? title: ''} onChange={(e) => setTitle(e.target.value)}></input>
                        </h2>
                
                        <span>{post?.user.username}</span>
                        <time>{new Date(post?.createdAt).toLocaleDateString()}</time>
                    </header>

                    <section className="post-content">
                        <textarea rows={15} id="text" name="text" value={text? text : ""} onChange={(e) => setText(e.target.value)}></textarea>
                    </section>

                </form>
            )
        }
}

export default PostLayout;