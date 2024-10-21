import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    return (
        <header>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;
