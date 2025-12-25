import { useEffect, useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

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
      <Navbar />
      <h1>Public Blog</h1> 

      <Routes>
        <Route
          path="/"
          element={<PostList posts={posts} />}
        />
        <Route
          path="/posts/:postId"
          element={<PostPage />}
        />

        <Route
        path='/login'
        element={<LoginForm />}
        />
      </Routes>
    </div>
  );

 
}

 

export default App
