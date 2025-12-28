import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import AdminPanel from './components/AdminPanel'
import LoginForm from './components/LoginForm';
import { clearAuth } from './util/authStorage';
import Navbar from './components/Navbar';
import PostPage from './components/PostPage';



function App() {
  const navigate = useNavigate();
  function handleLogout(){
    clearAuth();
    navigate("/");
  }


  return (
    <>

    
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<LoginForm />}
        />

        <Route
          path="/admin"
          element={<AdminPanel />}
        />

        <Route
          path="/admin/posts/:postId/edit"
          element={<PostPage />}
        />

        <Route
          path="/admin/posts/new"
          element={<PostPage />}
        />

      </Routes>
    </>
  );
}

export default App
