import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "../styles/Header.css"
import {AuthContext} from "../context/AuthContext";
import navbar from "./Navbar";

function Header(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };


    return (
        <div className="header-container">
            <ul className="logo">
                <li><Link to={`/`}><img src="/logo.png" alt="Logo du site Cafthé" width={100}/></Link></li>
            </ul>
            <ul className="header">
                <li>
                    {isAuthenticated ? (
                        <>
                            <span>Bonjour {user.prenom} {user.nom}</span>
                            <button onClick={handleLogout}>Se déconnecter</button>
                        </>
                    ) : (
                        <Link to={`/login`}>Se connecter</Link>
                    )}
                </li>
                <li>Panier</li>
            </ul>
        </div>
    );
}

export default Header;