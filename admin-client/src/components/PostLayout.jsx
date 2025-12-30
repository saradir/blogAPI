import "../styles/PostLayout.css";

function PostLayout({post, isEditing, handleChangeText, handleChangeTitle}){



        if(!isEditing){
            return(
                <article className="post">
                    <header className="post-header">
                        
                            <h2>{post.title}</h2>
                        
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
                            <input id="title" name="title" type="text" value={post.title} onChange={(e) => handleChangeTitle(e.target.value)}></input>
                        </h2>
                
                        <span>{post.user.username}</span>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </header>

                    <section className="post-content">
                        <textarea rows={15} id="text" name="text" value={post.text} onChange={(e) => handleChangeText(e.target.value)}></textarea>
                    </section>

                </form>
            )
        }
}

export default PostLayout;