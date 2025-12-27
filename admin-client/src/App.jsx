import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import AdminPanel from './components/AdminPanel'
import LoginForm from './components/LoginForm';

function App() {




  return (
    <>

    

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
