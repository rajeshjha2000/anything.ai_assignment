import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Task Manager
                </Link>
                {user && (
                    <div className="nav-menu">
                        <span className="nav-user">
                            {user.name} ({user.role})
                        </span>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="nav-link">
                                Admin Panel
                            </Link>
                        )}
                        <button onClick={handleLogout} className="btn btn-logout">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
