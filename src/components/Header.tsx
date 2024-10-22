import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car size={24} />
          <h1 className="text-2xl font-bold">Canadian Car Events</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/api" className="hover:text-blue-200">API</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link to="/admin" className="hover:text-blue-200">Admin</Link></li>
                <li><button onClick={handleLogout} className="hover:text-blue-200">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;