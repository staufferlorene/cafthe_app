import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import navbar from "./Navbar";
import "../styles/Global.css"
import "../styles/Header.css"

function Header(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };


    return (
        <div className="header-container">
            <ul>
                <li><Link to={`/`}><img className="logo" src="/logo.png" alt="Logo du site Cafthé"/></Link></li>
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