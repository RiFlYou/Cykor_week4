import {Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Write from './pages/write';
import List from './pages/list';

function App() {
  const token = localStorage.getItem('token');

  return (
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/list" element={<List />} />
      </Routes>
  );
}

export default App;
