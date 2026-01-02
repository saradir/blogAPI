import { useEffect, useState } from 'react';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import { clearAuth } from './util/authStorage';
import SignupForm from './components/SignupForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() =>{
    fetch(`${import.meta.env.VITE_API_SERVER}/api/posts`)
    .then(res => res.json())
    .then(data => {
      setPosts(data.posts);
      setLoading(false);
    });
  }, []);

  if(loading){
    return <p>Loading...</p>
  }

  function handleLogout(){
    clearAuth();
    navigate("/");
  }
  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>Public Blog</h1> 

      <Routes>
        <Route
          path="/"
          element={posts && <PostList posts={posts} />}
        />
        <Route
          path="/posts/:postId"
          element={<PostPage />}
        />

        <Route
        path='/login'
        element={<LoginForm />}
        />

        <Route
          path='/signup'
          element={<SignupForm />}
          />
      </Routes>
    </div>
  );

 
}

 

export default App
