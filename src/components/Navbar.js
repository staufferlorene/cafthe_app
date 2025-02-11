import React, {useContext} from 'react';
import "../styles/Navbar.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Navbar(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <ul className="nav">
                <li><Link to={`/categorie/cafe`}>Café</Link></li>
                <li><Link to={`/categorie/the`}>Thé</Link></li>
                <li><Link to={`/categorie/accessoire`}>Accessoire</Link></li>
            </ul>

            <div>
                {isAuthenticated ? (
                    <>
                        <span>Bonjour {user.prenom} {user.nom}</span>
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </>
                ) : (
                    <Link to={`/login`}>Se connecter</Link>
            )}
            </div>
        </nav>
    );
}

export default Navbar;