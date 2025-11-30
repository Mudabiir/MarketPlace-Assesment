import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        setIsMenuOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={closeMenu}>MarketPlace</Link>

                <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    {token && <li><Link to="/sell" onClick={closeMenu}>Sell</Link></li>}
                    {token && <li><Link to="/my-products" onClick={closeMenu}>My Products</Link></li>}
                    {!token ? (
                        <>
                            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                            <li><Link to="/signup" className="btn-primary" onClick={closeMenu}>Sign Up</Link></li>
                        </>
                    ) : (
                        <li><button onClick={handleLogout} className="btn-secondary">Logout</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
}