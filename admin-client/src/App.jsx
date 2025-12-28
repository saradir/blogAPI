import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import AdminPanel from './components/AdminPanel'
import LoginForm from './components/LoginForm';
import { clearAuth } from './util/authStorage';
import Navbar from './components/Navbar';



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

      </Routes>
    </>
  );
}

export default App
