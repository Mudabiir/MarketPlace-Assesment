import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sell from './pages/Sell';
import MyProducts from './pages/MyProducts';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
        <Route path="/my-products" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}