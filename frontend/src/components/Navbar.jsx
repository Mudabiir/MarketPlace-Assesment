import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">MarketPlace</Link>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    {token && <li><Link to="/sell">Sell</Link></li>}
                    {token && <li><Link to="/my-products">My Products</Link></li>}
                    {!token ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup" className="btn-primary">Sign Up</Link></li>
                        </>
                    ) : (
                        <li><button onClick={handleLogout} className="btn-secondary">Logout</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
}