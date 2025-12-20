import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    fetch("http://localhost:3000/api/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data.posts);
      setLoading(false);
    });
  }, []);

  if(loading){
    return <p>Loading...</p>
  }

  return (
  <div>
    <h1>Public Blog</h1>
    <ul>
      {posts.map( post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </div>
  );
}

 

export default App
